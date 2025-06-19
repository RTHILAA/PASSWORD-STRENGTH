function checkPasswordStrength(password) {
        let score = 0;
        let feedback = [];

        if (password.length === 0) {
          return { score: 0, strength: 'none', feedback: ['Enter a password'] };
        }

        if (password.length >= 8) score += 1;
        else feedback.push('At least 8 characters');

        if (/[a-z]/.test(password)) score += 1;
        else feedback.push('Add lowercase letters');

        if (/[A-Z]/.test(password)) score += 1;
        else feedback.push('Add uppercase letters');

        if (/[0-9]/.test(password)) score += 1;
        else feedback.push('Add numbers');

        if (/[^A-Za-z0-9]/.test(password)) score += 1;
        else feedback.push('Add special characters');

        const strengths = ['none', 'weak', 'fair', 'good', 'strong'];
        const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
        
        return {
          score,
          strength: strengths[score],
          label: strengthLabels[score],
          feedback
        };
      }

      function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 3 + 's';
          particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
          particlesContainer.appendChild(particle);
        }
      }

      function updateBackground(strength) {
        const background = document.getElementById('background');
        background.className = `background bg-${strength}`;
      }

      function updateStrengthIndicator(result) {
        const strengthBar = document.getElementById('strengthBar');
        const strengthText = document.getElementById('strengthText');
        
        const widthPercentage = (result.score / 4) * 100;
        strengthBar.style.width = widthPercentage + '%';
        strengthBar.className = `strength-bar ${result.strength}`;
        
        if (result.score === 0) {
          strengthText.textContent = 'Enter a password';
          strengthText.style.color = '#6b7280';
        } else {
          strengthText.textContent = `${result.label} - ${result.feedback.join(', ')}`;
          const colors = {
            weak: '#ef4444',
            fair: '#f59e0b',
            good: '#3b82f6',
            strong: '#10b981'
          };
          strengthText.style.color = colors[result.strength] || '#6b7280';
        }
      }

      function addInputAnimations() {
        const inputs = document.querySelectorAll('.input-field');
        inputs.forEach(input => {
          input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
          });
          
          input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
          });
        });
      }

      function addSubmitAnimation() {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.addEventListener('click', function(e) {
          e.preventDefault();
          
          const ripple = document.createElement('span');
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;
          
          ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
          `;
          
          this.appendChild(ripple);
          
          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      }

      const style = document.createElement('style');
      style.textContent = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);

      document.addEventListener('DOMContentLoaded', function() {
        createParticles();
        addInputAnimations();
        addSubmitAnimation();
        
        const passwordInput = document.getElementById('password');
        passwordInput.addEventListener('input', function() {
          const result = checkPasswordStrength(this.value);
          updateStrengthIndicator(result);
          updateBackground(result.strength);
        });
      });
