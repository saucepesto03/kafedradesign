from flask import Flask, render_template

app = Flask(__name__)


@app.route("/")
def index():
    return render_template('index.html')

@app.route('/template/<template_name>')
def get_template(template_name):
    try:
        return render_template(template_name)
    except Exception as e:
        return f"Ошибка загрузки шаблона: {e}", 404
    

if __name__ == "__main__":
    app.run()