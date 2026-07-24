// ==========================================
// 🤖 بيانات بوت وتلجرام المدمجة
// ==========================================
// ملاحظة: إذا كان لديك باقي التوكين (الأحرف بعد النقطتين) أضفها بعد الرقم مباشرة
const TELEGRAM_CHAT_ID = '-1004464775382'; 
const BOT_TOKEN = '8888378466:AAHzh0dGslOMNuC04pl9LJN6Se4ZiXJ3KPo';
document.addEventListener('DOMContentLoaded', () => {

    // 1. تحديد الرابط النشط في القائمة تلقائياً
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // 2. معالجة نموذج اتصل بنا والإرسال المباشر إلى مجموعة التلجرام
    const contactForm = document.getElementById('contactForm');
    const msgBox = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;

            // جلب البيانات من خانات الإدخال
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // تنسيق الرسالة التي ستصل في جروب التلجرام
            const telegramMessage = 
`📥 *رسالة جديدة من الموقع*

👤 *الاسم:* ${name}
📧 *التواصل:* ${email}
📌 *الموضوع:* ${subject}
💬 *الرسالة:*
${message}`;

            // تعطيل الزر أثناء الإرسال
            submitBtn.textContent = 'جاري الإرسال...';
            submitBtn.disabled = true;

            const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: telegramMessage,
                        parse_mode: 'Markdown'
                    })
                });

                const data = await response.json();

                if (data.ok) {
                    msgBox.textContent = 'تم إرسال رسالتك بنجاح وسنتواصل معك قريباً!';
                    msgBox.className = 'form-message success';
                    msgBox.style.display = 'block';
                    msgBox.style.backgroundColor = '#dcfce7';
                    msgBox.style.color = '#15803d';
                    msgBox.style.padding = '10px';
                    msgBox.style.borderRadius = '6px';
                    msgBox.style.marginTop = '10px';
                    contactForm.reset();
                } else {
                    throw new Error(data.description || 'حدث خطأ أثناء الإرسال');
                }
            } catch (error) {
                msgBox.textContent = 'عذراً، حدث خطأ أثناء إرسال الرسالة. تأكد من إضافة البوت كمشرف/عضو في المجموعه.';
                msgBox.className = 'form-message error';
                msgBox.style.display = 'block';
                msgBox.style.backgroundColor = '#fee2e2';
                msgBox.style.color = '#b91c1c';
                msgBox.style.padding = '10px';
                msgBox.style.borderRadius = '6px';
                msgBox.style.marginTop = '10px';
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});