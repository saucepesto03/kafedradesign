from flask import Flask, render_template, request, redirect, flash
from flask_mail import Mail, Message
from flask_wtf import FlaskForm, CSRFProtect
from wtforms import StringField, EmailField, validators
from dotenv import load_dotenv
import os

# Загрузить переменные окружения из .env файла
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY')  # Использование переменной окружения для секретного ключа

# Настройка Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.yourmailserver.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')

mail = Mail(app)
csrf = CSRFProtect(app)

class ContactForm(FlaskForm):
    name = StringField('Name', [validators.DataRequired(), validators.Length(min=1, max=50)])
    email = EmailField('Email', [validators.DataRequired(), validators.Email()])
    phone = StringField('Phone', [validators.DataRequired(), validators.Length(min=10, max=15)])

@app.route("/", methods=['GET', 'POST'])
def index():
    form = ContactForm()
    if form.validate_on_submit():
        name = form.name.data
        email = form.email.data
        phone = form.phone.data

        msg = Message('Сообщение с сайта', 
                      sender=app.config['MAIL_USERNAME'], 
                      recipients=['nano.gleb@yandex.ru'])  # email получателя
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
    
    return render_template('index.html', form=form)

@app.route('/template/<template_name>')
def get_template(template_name):
    try:
        return render_template(template_name)
    except Exception as e:
        return f"Ошибка загрузки шаблона: {e}", 404

if __name__ == "__main__":
    app.run(debug=True)