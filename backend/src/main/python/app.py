from flask import Flask, Response
from flask_cors import CORS
import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
import io
import pyodbc
import numpy as np

plt.switch_backend('Agg')

app = Flask(__name__)
CORS(app, origins='*')  

def connect():
    try:
        conn = pyodbc.connect('Driver={SQL Server};'
                              'Server=CA-C-00651\\SQLEXPRESS;'
                              'Database=blueteam;'
                              'Trusted_Connection=yes;')
        return conn
    except Exception as e:
        print(f"Connection failed: {e}")
        raise

def get_data(conn, user_id):
    cursor = conn.cursor()
    data = []
    try:
        cursor.execute('''SELECT 
                            s.nome AS SkillName, 
                            us.valor * s.peso AS SkillValueWithWeight 
                       FROM UserSkills us 
                       JOIN UserData ud 
                       ON us.userId = ud.id 
                       JOIN Skills s 
                       ON us.skillId = s.id 
                       WHERE ud.id = ? 
                       ORDER BY s.nome;''', user_id)
        for row in cursor:
            data.append((row[0], row[1]))  
        num_rows = len(data)
    except Exception as e:
        print(f"An error occurred: {e}")  
    finally:
        cursor.close()  
    return data  

def get_average(conn, class_id):
    cursor = conn.cursor()
    data = []
    try:
        cursor.execute('''SELECT 
                            ud.nome, 
                            AVG(us.valor * s.peso) AS MediaSkillValue
                        FROM UserSkills us
                        JOIN UserData ud ON us.userId = ud.id
                        JOIN Skills s ON us.skillId = s.id
                        WHERE ud.classId = ?
                        GROUP BY ud.id, ud.nome;''', class_id)

        for row in cursor:
            data.append((row[0], row[1]))  
    except Exception as e:
        print(f"An error occurred: {e}")  
    finally:
        cursor.close()  
    return data  

def get_scores(conn, subject_name, class_name):
    cursor = conn.cursor()
    data = []
    try:
        sql_query = '''SELECT
                            u.nome AS NomeAluno,
                            (us.valor * sk.peso) AS NotaMedia
                        FROM UserData u
                        JOIN UserSkills us ON u.id = us.userId
                        JOIN Skills sk ON us.skillId = sk.id
                        JOIN CourseSubject cs ON sk.subjectClassId = cs.subjectId
                        JOIN Subject s ON cs.subjectId = s.id
                        JOIN Classes c ON u.classId = c.id
                        WHERE
                            s.nome LIKE ?
                            AND c.nome LIKE ?
                        GROUP BY
                        u.nome, s.nome;'''

        cursor.execute(sql_query, ('%' + subject_name + '%', '%' + class_name + '%'))

        for row in cursor:
            data.append((row[0], row[1]))
            
    except Exception as e:
        print(f"An error occurred: {e}")  
    finally:
        cursor.close()  
    return data  
    

def create_bar_graph(labels, data, subject_name):
    fig, ax = plt.subplots()
    
    ax.bar(labels, data, color="green")
    
    ax.set_xticks(range(len(labels)))
    ax.set_xticklabels(labels)
    
    ax.set_xlabel("Alunos")
    ax.set_ylabel("Nota")
    ax.set_title(f"Notas dos alunos em {subject_name}")

    return fig

def create_figure(labels, data, title='Radar Chart', color='blue', legend_label=None):
    """
    Plota um gráfico de radar.
    
    :param labels: Lista de categorias ou etiquetas para o gráfico.
    :param data: Lista de valores correspondentes a cada etiqueta.
    :param title: Título do gráfico.
    :param color: Cor da linha e preenchimento do gráfico.
    :param legend_label: Rótulo da legenda para a série de dados.
    """
    num_vars = len(labels)
    angles = np.linspace(0, 2 * np.pi, num_vars, endpoint=False).tolist()
    data += data[:1]
    angles += angles[:1]

    fig, ax = plt.subplots(figsize=(12, 8), subplot_kw=dict(polar=True))

    ax.fill(angles, data, color='blue', alpha=0.25)
    ax.plot(angles, data, color="blue", linewidth=2, linestyle='solid')

    ax.set_yticklabels([])
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(labels)

    ax.yaxis.grid(True)

    if legend_label:
        ax.legend([legend_label], loc='upper right')
    
    plt.title(title, size=20, color=color, y=1.1)
    
    media = np.mean(data[:-1]) 

    for i in range(num_vars):
        ax.text(angles[i], data[i] - 1.0, f'{data[i]:.1f}', 
                horizontalalignment='center', size=10, color=color, weight='semibold',
                bbox=dict(facecolor='white', edgecolor=color, boxstyle='round,pad=0.3'))
        
    ax.annotate(f'Média Geral: {media:.2f}', 
                xy=(0, 0),  
                xytext=(150, 250),  
                textcoords='offset points', 
                horizontalalignment='center', 
                size=14, 
                color="purple", 
                weight='semibold',
                bbox=dict(facecolor='white', edgecolor="black", boxstyle='round,pad=0.3'))

    return fig

@app.route("/student/<id>", methods=['GET'])
def home(id):
    try:
        conn = connect()
        dados = get_data(conn, id)
        skills = [skill[0] for skill in dados]
        values = [value[1] for value in dados]
        fig = create_figure(skills, values, title='Notas do Aluno', color='red')
        output = io.BytesIO()
        FigureCanvas(fig).print_png(output)
        return Response(output.getvalue(), mimetype='image/png')
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}, 500  

@app.route("/class/<id>", methods=['GET'])
def test_route(id):
    try:
        conn = connect()
        dados = get_average(conn, id)
        students = [student[0] for student in dados]
        averages = [value[1] for value in dados]
        fig = create_figure(students, averages, title='Média ponderada das habilidades de cada aluno', color='red')
        output = io.BytesIO()
        FigureCanvas(fig).print_png(output)
        return Response(output.getvalue(), mimetype='image/png')
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}, 500  

@app.route("/subject/<name>/<class_name>", methods=['GET'])
def subject(name, class_name):
    try:
        conn = connect()
        dados = get_scores(conn, name, class_name)
        students = [student[0] for student in dados]
        scores = [value[1] for value in dados]
        fig = create_bar_graph(students, scores, name)
        output = io.BytesIO()
        FigureCanvas(fig).print_png(output)
        return Response(output.getvalue(), mimetype='image/png')
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": str(e)}, 500  
    
    
if __name__ == "__main__":
    app.run(debug=True, port=8080)