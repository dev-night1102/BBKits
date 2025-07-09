import{J as i,j as e,Q as l}from"./app-BsWHPeRh.js";import{A as n}from"./AuthenticatedLayout-BIUJBCsh.js";import"./transition-BEFkAd42.js";function x(){const{auth:t,gamification:a}=i().props;return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
                
                :root {
                    --primary-color: #D4A574;
                    --secondary-color: #F5E6D3;
                    --accent-color: #E8B4CB;
                    --accent-dark: #C8869B;
                    --text-dark: #2C2C2C;
                    --text-light: #666;
                    --white: #FFFFFF;
                    --gradient: linear-gradient(135deg, #D4A574 0%, #E8B4CB 100%);
                    --gradient-soft: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 100%);
                    --gradient-hero: linear-gradient(135deg, rgba(212, 165, 116, 0.95) 0%, rgba(232, 180, 203, 0.95) 100%);
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                    --shadow-glow: 0 0 30px rgba(212, 165, 116, 0.3);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .dashboard-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 50%, #F0F9FF 100%);
                    min-height: 100vh;
                }

                .card-gradient {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    position: relative;
                    overflow: hidden;
                }

                .card-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .card-gradient:hover {
                    transform: translateY(-10px) scale(1.02);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                .stat-card {
                    background: var(--gradient);
                    border-radius: 20px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s;
                }

                .stat-card:hover::before {
                    left: 100%;
                }

                .stat-card:hover {
                    transform: translateY(-8px) scale(1.05);
                    box-shadow: var(--shadow-hover);
                }

                .feature-icon {
                    background: rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                    backdrop-filter: blur(10px);
                }

                .feature-icon:hover {
                    transform: scale(1.2) rotate(10deg);
                    box-shadow: var(--shadow-glow);
                    background: rgba(255, 255, 255, 0.3);
                }

                .floating-particles {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                }

                .particle {
                    position: absolute;
                    background: rgba(212, 165, 116, 0.1);
                    border-radius: 50%;
                    animation: float 15s infinite linear;
                }

                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) rotate(360deg);
                        opacity: 0;
                    }
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.8s ease-out forwards;
                    opacity: 0;
                    transform: translateY(30px);
                }

                .animate-fadeInUp:nth-child(1) { animation-delay: 0.1s; }
                .animate-fadeInUp:nth-child(2) { animation-delay: 0.2s; }
                .animate-fadeInUp:nth-child(3) { animation-delay: 0.3s; }
                .animate-fadeInUp:nth-child(4) { animation-delay: 0.4s; }

                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .progress-bar {
                    background: var(--gradient);
                    transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .progress-bar::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    animation: shimmer 2s infinite;
                }

                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }

                .level-progress {
                    background: rgba(255, 255, 255, 0.3);
                    backdrop-filter: blur(10px);
                    transition: width 2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .logo-glow {
                    background: var(--gradient);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: logoGlow 3s ease-in-out infinite alternate;
                }

                @keyframes logoGlow {
                    0% { filter: drop-shadow(0 0 5px rgba(212, 165, 116, 0.3)); }
                    100% { filter: drop-shadow(0 0 15px rgba(212, 165, 116, 0.6)); }
                }

                .achievement-card {
                    background: linear-gradient(145deg, #FFF9C4 0%, #FEF3CD 100%);
                    border: 2px solid #F59E0B;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .achievement-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%);
                    pointer-events: none;
                }

                .achievement-card:hover {
                    transform: translateY(-5px) scale(1.05);
                    box-shadow: 0 15px 30px rgba(245, 158, 11, 0.3);
                    border-color: #D97706;
                }

                .ranking-card {
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .ranking-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, rgba(212, 165, 116, 0.05) 0%, rgba(232, 180, 203, 0.05) 100%);
                    pointer-events: none;
                }

                .ranking-card:hover {
                    transform: scale(1.02);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }

                .user-highlight {
                    background: linear-gradient(135deg, #FCE7F3 0%, #FDF2F8 100%);
                    border: 2px solid var(--accent-color);
                }

                .motivational-card {
                    background: var(--gradient);
                    position: relative;
                    overflow: hidden;
                }

                .motivational-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="2" fill="white" opacity="0.1"/><circle cx="80" cy="40" r="1" fill="white" opacity="0.1"/><circle cx="40" cy="80" r="1.5" fill="white" opacity="0.1"/></svg>');
                    animation: sparkle 20s linear infinite;
                }

                @keyframes sparkle {
                    0% { transform: translateY(0) rotate(0deg); }
                    100% { transform: translateY(-100px) rotate(360deg); }
                }

                .cta-buttons {
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }

                .cta-buttons:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                }
            `}),e.jsxs(n,{header:e.jsxs("div",{className:"flex items-center justify-between bg-white/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg border border-white/20",children:[e.jsx("h2",{className:"text-2xl font-bold logo-glow",children:"Dashboard BBKits ✨"}),e.jsxs("div",{className:"text-sm text-gray-600 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full shadow-md",children:["Bem-vinda, ",e.jsx("span",{className:"font-semibold text-pink-600",children:t.user.name}),"! 💎"]})]}),children:[e.jsx(l,{title:"Dashboard - BBKits"}),e.jsxs("div",{className:"dashboard-bg relative overflow-hidden",children:[e.jsx("div",{className:"floating-particles",children:Array.from({length:12},(s,r)=>e.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*8+4+"px",height:Math.random()*8+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+10+"s"}},r))}),e.jsx("div",{className:"py-12 relative z-10",children:e.jsxs("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"grid gap-8 mb-12 md:grid-cols-2 xl:grid-cols-4",children:[e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Vendas Este Mês"}),e.jsx("p",{className:"text-3xl font-bold drop-shadow-lg",children:"0"}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"📊 Suas vendas"})]})]})}),e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Comissão do Mês"}),e.jsx("p",{className:"text-2xl font-bold drop-shadow-lg",children:"R$ 0,00"}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"💰 Seus ganhos"})]})]})}),e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Vendas Aprovadas"}),e.jsx("p",{className:"text-3xl font-bold drop-shadow-lg",children:"0"}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"✅ Confirmadas"})]})]})}),e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Meta do Mês"}),e.jsx("p",{className:"text-2xl font-bold drop-shadow-lg",children:"R$ 40.000,00"}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"🎯 Objetivo"})]})]})})]}),e.jsxs("div",{className:"grid gap-8 mb-12 md:grid-cols-2",children:[e.jsxs("div",{className:"card-gradient p-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"🎯"})}),e.jsx("h4",{className:"text-2xl font-bold text-gray-800",children:"Progresso da Meta"})]}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-4 shadow-inner mb-4",children:e.jsx("div",{className:"progress-bar h-4 rounded-full shadow-lg",style:{width:"0%"}})}),e.jsx("p",{className:"text-lg font-medium text-gray-700 mb-6",children:"0% da meta mensal alcançada"}),e.jsx("div",{className:"motivational-card p-6 rounded-2xl text-white relative overflow-hidden",children:e.jsxs("div",{className:"relative z-10",children:[e.jsx("p",{className:"text-lg font-semibold mb-2",children:"💪 Dica Motivacional"}),e.jsx("p",{className:"text-pink-100 italic",children:'"Cada venda é uma história de amor que você ajuda a criar. Continue brilhando!"'})]})})]}),e.jsxs("div",{className:"card-gradient p-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"📋"})}),e.jsx("h4",{className:"text-2xl font-bold text-gray-800",children:"Últimas Vendas"})]}),e.jsxs("div",{className:"text-center py-12",children:[e.jsx("div",{className:"w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg",children:e.jsx("svg",{className:"w-10 h-10 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),e.jsx("p",{className:"text-xl font-semibold text-gray-600 mb-2",children:"Nenhuma venda registrada ainda"}),e.jsx("p",{className:"text-gray-500",children:"Registre sua primeira venda para começar! 🚀"})]})]})]}),e.jsx("div",{className:"stat-card p-8 mb-12 relative z-10",children:e.jsxs("div",{className:"flex items-center justify-between text-white",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center mb-3",children:[e.jsx("span",{className:"text-3xl mr-3",children:t.user.role==="vendedora"?"💼":"⚡"}),e.jsx("h4",{className:"text-2xl font-bold",children:t.user.role==="vendedora"?"Pronta para vender mais?":"Gerencie o Sistema BBKits"})]}),e.jsx("p",{className:"text-white/90 text-lg",children:t.user.role==="vendedora"?"Registre uma nova venda e aumente suas comissões!":"Acesse as ferramentas administrativas"})]}),e.jsx("div",{className:"flex space-x-4",children:t.user.role==="vendedora"?e.jsxs(e.Fragment,{children:[e.jsx("a",{href:"/sales/create",className:"cta-buttons px-6 py-3 text-sm font-semibold text-white bg-white/20 border border-white/30 rounded-2xl transition-all duration-300 hover:scale-105",children:"✨ Nova Venda"}),e.jsx("a",{href:"/reports/sales",className:"cta-buttons px-6 py-3 text-sm font-semibold text-white bg-white/20 border border-white/30 rounded-2xl transition-all duration-300 hover:scale-105",children:"📄 Relatório PDF"})]}):e.jsxs(e.Fragment,{children:[e.jsx("a",{href:"/admin/dashboard",className:"cta-buttons px-6 py-3 text-sm font-semibold text-white bg-white/20 border border-white/30 rounded-2xl transition-all duration-300 hover:scale-105",children:"📊 Admin Dashboard"}),e.jsx("a",{href:"/admin/sales",className:"cta-buttons px-6 py-3 text-sm font-semibold text-white bg-white/20 border border-white/30 rounded-2xl transition-all duration-300 hover:scale-105",children:"✅ Aprovar Vendas"})]})})]})}),t.user.role==="vendedora"&&a&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"stat-card p-10 mb-8 text-white relative overflow-hidden",children:[e.jsxs("div",{className:"flex items-center justify-between mb-8 relative z-10",children:[e.jsxs("div",{children:[e.jsxs("h2",{className:"text-3xl font-bold mb-3 flex items-center",children:[e.jsx("span",{className:"text-4xl mr-3",children:a.level.icon}),"Nível ",a.level.level]}),e.jsx("p",{className:"text-xl text-white/90",children:a.level.message})]}),e.jsxs("div",{className:"text-right",children:[e.jsxs("div",{className:"text-5xl font-bold drop-shadow-lg",children:[Math.round(a.level.progress),"%"]}),e.jsx("div",{className:"text-lg text-white/80",children:"Progresso para próximo nível"})]})]}),e.jsx("div",{className:"w-full bg-white/20 rounded-full h-4 mb-4 shadow-inner relative z-10",children:e.jsx("div",{className:"level-progress h-4 rounded-full shadow-lg",style:{width:`${a.level.progress}%`}})})]}),e.jsx("div",{className:"motivational-card p-8 mb-8 text-white rounded-2xl relative overflow-hidden",children:e.jsxs("div",{className:"relative z-10",children:[e.jsxs("h3",{className:"text-2xl font-bold mb-4 flex items-center",children:[e.jsx("span",{className:"text-3xl mr-3",children:"🎆"}),"Frase Motivacional do Dia"]}),e.jsxs("p",{className:"text-xl italic leading-relaxed",children:['"',a.motivationalQuote,'"']})]})}),a.achievements&&a.achievements.length>0&&e.jsxs("div",{className:"card-gradient p-8 mb-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"🏆"})}),e.jsx("h3",{className:"text-2xl font-bold text-gray-900",children:"Suas Conquistas"})]}),e.jsx("div",{className:"grid grid-cols-2 md:grid-cols-3 gap-6",children:a.achievements.map((s,r)=>e.jsx("div",{className:"achievement-card p-6 rounded-2xl text-center shadow-lg",children:e.jsxs("div",{className:"relative z-10",children:[e.jsx("div",{className:"text-4xl mb-3",children:s.icon}),e.jsx("div",{className:"font-bold text-gray-900 text-lg mb-2",children:s.name}),e.jsx("div",{className:"text-sm text-gray-700",children:s.description})]})},r))})]}),a.ranking&&a.ranking.length>0&&e.jsxs("div",{className:"card-gradient p-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"🏅"})}),e.jsx("h3",{className:"text-2xl font-bold text-gray-900",children:"Ranking Mensal"})]}),e.jsx("div",{className:"space-y-4",children:a.ranking.slice(0,5).map(s=>e.jsxs("div",{className:`ranking-card flex items-center justify-between p-6 rounded-2xl shadow-md ${s.user.id===t.user.id?"user-highlight":"bg-white/70"}`,children:[e.jsxs("div",{className:"flex items-center",children:[e.jsxs("div",{className:"flex items-center mr-6",children:[e.jsx("span",{className:"text-3xl mr-3",children:s.badge.icon}),e.jsxs("span",{className:"font-bold text-2xl text-gray-800",children:[s.position,"º"]})]}),e.jsxs("div",{children:[e.jsxs("div",{className:`font-bold text-lg ${s.user.id===t.user.id?"text-pink-800":"text-gray-900"}`,children:[s.user.name,s.user.id===t.user.id&&e.jsx("span",{className:"ml-2 px-3 py-1 bg-pink-500 text-white text-sm rounded-full",children:"Você 👑"})]}),e.jsxs("div",{className:"text-gray-600 font-medium",children:["📊 ",s.monthly_sales_count," vendas • 🌟 Nível ",s.level.level]})]})]}),e.jsx("div",{className:"text-right",children:e.jsxs("div",{className:"font-bold text-2xl text-green-600",children:["R$ ",new Intl.NumberFormat("pt-BR").format(s.monthly_total)]})})]},s.user.id))}),a.userPosition>5&&e.jsx("div",{className:"mt-6 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl border-2 border-blue-300 shadow-lg",children:e.jsxs("div",{className:"text-center text-blue-800 font-semibold text-lg",children:["💪 Você está na ",a.userPosition,"ª posição! Continue vendendo para subir no ranking! 🚀"]})})]})]})]})})]})]}),e.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})]})}export{x as default};
