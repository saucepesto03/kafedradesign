from flask import Flask, render_template, request, redirect, flash
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Для использования flash сообщений

app.config['MAIL_SERVER'] = 'smtp.yourmailserver.com'  # Замените на сервер вашей почты
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'your_email@example.com'  # Замените на ваш email
app.config['MAIL_PASSWORD'] = 'your_password'  # Замените на ваш пароль

mail = Mail(app)

@app.route("/")
def index():
    return render_template('index.html')

@app.route('/template/<template_name>')
def get_template(template_name):
    try:
        return render_template(template_name)
    except Exception as e:
        return f"Ошибка загрузки шаблона: {e}", 404
    
@app.route('/send_mail', methods=['POST'])
def send_mail():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        phone = request.form['phone']

        msg = Message('Сообщение с сайта', 
                      sender='your_email@example.com', 
                      recipients=['recipient@example.com'])  # Замените на email получателя
        msg.body = f"""
        Имя: {name}
        Email: {email}
        Телефон: {phone}
        """
        try:
            mail.send(msg)
            flash('Сообщение успешно отправлено!', 'success')
        except Exception as e:
            flash(f'Не удалось отправить сообщение. Ошибка: {str(e)}', 'danger')
        
        return redirect('/')

if __name__ == "__main__":
    app.run()