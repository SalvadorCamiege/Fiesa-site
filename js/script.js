document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navList = mainNav.querySelector('ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navList.classList.toggle('show');
        });
    }
    
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navList.classList.remove('show');
            }
        });
    });
    
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    const form = document.getElementById("inscricaoForm");
if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        let nome = document.getElementById("nome").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefone = document.getElementById("telefone").value.trim();
        let tipo = document.getElementById("tipo").value;

        if (nome.length < 3) {
            alert("Por favor, insira um nome válido (mínimo 3 caracteres).");
            return;
        }

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um email válido.");
            return;
        }

        let telefoneLimpo = telefone.replace(/\D/g, '');
        if (telefone && (telefoneLimpo.length < 9 || telefoneLimpo.length > 15)) {
            alert("Por favor, insira um telefone válido (apenas números; 9 a 15 dígitos).");
            return;
        }

        if (tipo === "") {
            alert("Por favor, selecione o tipo de participante.");
            return;
        }

        alert("Formulário validado com sucesso! 🚀");
        form.submit();
    });
}

    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function animateCounters() {
        if (counted) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;

        const statsSectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;
        
        if (statsSectionPos < screenPos) {
            counted = true;
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let count = 0;
                const duration = 2000;
                const increment = target / (duration / 20);
                
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        stat.textContent = target + (stat.textContent.includes('+') ? '+' : '');
                        clearInterval(timer);
                    } else {
                        stat.textContent = Math.floor(count) + (stat.textContent.includes('+') ? '+' : '');
                    }
                }, 20);
            });
        }
    }
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    function setActiveNavItem() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const headerHeight = document.querySelector('header').offsetHeight;
            if (window.pageYOffset >= (sectionTop - headerHeight - 50)) {
                currentSection = section.getAttribute('id');
            }
        });
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + currentSection) {
                item.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', setActiveNavItem);

    const programItems = document.querySelectorAll('.atividade');
    programItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    function animateProgramItems() {
        programItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    function handleScrollAnimations() {
        const programSection = document.querySelector('.programa');
        if (programSection) {
            const programSectionPos = programSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            if (programSectionPos < screenPos) {
                animateProgramItems();
            }
        }
    }

    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations();
});