function saveSchedule() {
    const schedule = [];
    document.querySelectorAll('.schedule-dropdown').forEach(dropdown => {
        const selectedOption = dropdown.options[dropdown.selectedIndex];
        if (selectedOption.value) {
            schedule.push({
                subject: dropdown.dataset.subject,
                class: selectedOption.textContent
            });
        }
    });

    if (schedule.length === 0) {
        alert('Please select at least one class before saving!');
        return;
    }

    const scheduleData = {
        saved_at: new Date().toLocaleString(),
        classes: schedule
    };

    const dataStr = JSON.stringify(scheduleData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `schedule_${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showSuccessMessage();
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.textContent = '✨ Schedule saved! ✨';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #FF6B9D, #FFD700);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        font-weight: bold;
        font-family: 'Fredoka', sans-serif;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.5s ease, slideUp 0.5s ease 2.5s forwards;
        z-index: 1000;
    `;

    if (!document.querySelector('style[data-schedule-animation]')) {
        const style = document.createElement('style');
        style.setAttribute('data-schedule-animation', 'true');
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
            }
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translateX(-50%) translateY(0);
                }
                to {
                    opacity: 0;
                    transform: translateX(-50%) translateY(-30px);
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(message);
    setTimeout(() => message.remove(), 3000);
}
