import{J as x,j as e,Q as m}from"./app-Bb6oJ2s4.js";import{A as h}from"./AuthenticatedLayout-t0uJTjr-.js";import"./transition-C7WWg7nb.js";function u({stats:t,topPerformers:l,recentSales:n,monthlyData:p}){const{auth:i}=x().props,r=a=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a),d=a=>new Date(a).toLocaleDateString("pt-BR"),o=a=>{const s={pendente:"bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg",aprovado:"bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg",recusado:"bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg"},c={pendente:"Pendente",aprovado:"Aprovado",recusado:"Recusado"};return e.jsx("span",{className:`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transform hover:scale-105 transition-all duration-300 ${s[a]}`,children:c[a]})};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

                .table-row {
                    transition: all 0.3s ease;
                }

                .table-row:hover {
                    background: var(--gradient-soft);
                    transform: scale(1.01);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .quick-action-btn {
                    background: rgba(255, 255, 255, 0.2);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.3);
                    transition: all 0.3s ease;
                }

                .quick-action-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
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

                .ranking-badge {
                    transition: all 0.3s ease;
                }

                .ranking-badge:hover {
                    transform: scale(1.2) rotate(5deg);
                }
            `}),e.jsxs(h,{header:e.jsxs("div",{className:"flex items-center justify-between bg-white/95 backdrop-blur-lg rounded-2xl px-6 py-4 shadow-lg border border-white/20",children:[e.jsx("h2",{className:"text-2xl font-bold logo-glow",children:"Dashboard Administrativo - BBKits ✨"}),e.jsxs("div",{className:"text-sm text-gray-600 bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-full shadow-md",children:["Bem-vindo, ",e.jsx("span",{className:"font-semibold text-pink-600",children:i.user.name}),"! 👋"]})]}),children:[e.jsx(m,{title:"Admin Dashboard - BBKits"}),e.jsxs("div",{className:"dashboard-bg relative overflow-hidden",children:[e.jsx("div",{className:"floating-particles",children:Array.from({length:15},(a,s)=>e.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*8+4+"px",height:Math.random()*8+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+10+"s"}},s))}),e.jsx("div",{className:"py-12 relative z-10",children:e.jsxs("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:[e.jsxs("div",{className:"grid gap-8 mb-12 md:grid-cols-2 xl:grid-cols-4",children:[e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Total de Vendedoras"}),e.jsx("p",{className:"text-3xl font-bold drop-shadow-lg",children:t.totalSellers}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"👥 Equipe BBKits"})]})]})}),e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Vendas Este Mês"}),e.jsx("p",{className:"text-2xl font-bold drop-shadow-lg",children:r(t.monthlyRevenue)}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"💰 Faturamento"})]})]})}),e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Vendas Pendentes"}),e.jsx("p",{className:"text-3xl font-bold drop-shadow-lg",children:t.pendingSales}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"⏳ Aguardando"})]})]})}),e.jsx("div",{className:"stat-card animate-fadeInUp",children:e.jsxs("div",{className:"p-6 flex items-center text-white relative z-10",children:[e.jsx("div",{className:"feature-icon p-4 rounded-full mr-6",children:e.jsx("svg",{className:"w-8 h-8",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{fillRule:"evenodd",d:"M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",clipRule:"evenodd"})})}),e.jsxs("div",{children:[e.jsx("p",{className:"mb-2 text-sm font-medium text-white/90",children:"Comissões do Mês"}),e.jsx("p",{className:"text-2xl font-bold drop-shadow-lg",children:r(t.monthlyCommissions)}),e.jsx("p",{className:"text-xs text-white/80 mt-1",children:"🎯 Bonificações"})]})]})})]}),e.jsxs("div",{className:"grid gap-8 mb-12 md:grid-cols-2",children:[e.jsxs("div",{className:"card-gradient p-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"🏆"})}),e.jsx("h4",{className:"text-2xl font-bold text-gray-800",children:"Top Vendedoras do Mês"})]}),e.jsx("div",{className:"space-y-4",children:l&&l.length>0?l.map((a,s)=>e.jsxs("div",{className:"flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx("div",{className:`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4 ranking-badge shadow-lg ${s===0?"bg-gradient-to-r from-yellow-400 to-yellow-600":s===1?"bg-gradient-to-r from-gray-300 to-gray-500":s===2?"bg-gradient-to-r from-orange-400 to-orange-600":"bg-gradient-to-r from-purple-400 to-purple-600"}`,children:s===0?"👑":s+1}),e.jsxs("div",{children:[e.jsx("p",{className:"text-lg font-semibold text-gray-900",children:a.name}),e.jsxs("p",{className:"text-sm text-gray-600",children:["✨ ",a.sales_count," vendas realizadas"]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("p",{className:"text-lg font-bold text-green-600",children:r(a.total_revenue)}),e.jsxs("p",{className:"text-sm text-gray-500",children:["💎 ",r(a.total_commission)]})]})]},a.id)):e.jsxs("div",{className:"text-center py-8",children:[e.jsx("div",{className:"w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx("span",{className:"text-2xl",children:"📊"})}),e.jsx("p",{className:"text-gray-500 text-lg",children:"Nenhuma venda este mês ainda"}),e.jsx("p",{className:"text-gray-400 text-sm",children:"Seja a primeira! 🚀"})]})})]}),e.jsxs("div",{className:"card-gradient p-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"📈"})}),e.jsx("h4",{className:"text-2xl font-bold text-gray-800",children:"Progresso Mensal"})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-between mb-3",children:[e.jsx("span",{className:"text-lg font-medium text-gray-700",children:"🎯 Meta Coletiva"}),e.jsxs("span",{className:"text-lg font-bold text-gray-900",children:[r(t.monthlyRevenue)," / ",r(t.monthlyTarget)]})]}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-4 shadow-inner",children:e.jsx("div",{className:"progress-bar h-4 rounded-full shadow-lg",style:{width:`${Math.min(t.monthlyRevenue/t.monthlyTarget*100,100)}%`}})}),e.jsxs("p",{className:"text-sm text-gray-600 mt-2 font-medium",children:["🔥 ",(t.monthlyRevenue/t.monthlyTarget*100).toFixed(1),"% da meta alcançada"]})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-6 pt-6 border-t border-gray-200",children:[e.jsxs("div",{className:"text-center p-4 bg-white/70 rounded-2xl shadow-md",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"✅ Vendas Aprovadas"}),e.jsx("p",{className:"text-3xl font-bold text-green-600",children:t.approvedSales})]}),e.jsxs("div",{className:"text-center p-4 bg-white/70 rounded-2xl shadow-md",children:[e.jsx("p",{className:"text-sm text-gray-600 mb-2",children:"📊 Taxa de Aprovação"}),e.jsx("p",{className:"text-3xl font-bold text-blue-600",children:t.totalSalesCount>0?(t.approvedSales/t.totalSalesCount*100).toFixed(1)+"%":"0%"})]})]})]})]})]}),e.jsxs("div",{className:"card-gradient p-8 mb-8 relative z-10",children:[e.jsxs("div",{className:"flex items-center mb-6",children:[e.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-green-400 to-teal-500 rounded-full flex items-center justify-center mr-4 shadow-lg",children:e.jsx("span",{className:"text-2xl",children:"📋"})}),e.jsx("h4",{className:"text-2xl font-bold text-gray-800",children:"Vendas Recentes"})]}),e.jsx("div",{className:"overflow-x-auto rounded-2xl shadow-lg",children:e.jsxs("table",{className:"min-w-full divide-y divide-gray-200 bg-white/90 backdrop-blur-sm",children:[e.jsx("thead",{className:"bg-gradient-to-r from-pink-50 to-purple-50",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700",children:"👩‍💼 Vendedora"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700",children:"👤 Cliente"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700",children:"💰 Valor"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700",children:"📅 Data"}),e.jsx("th",{className:"px-6 py-4 text-left text-sm font-bold uppercase tracking-wider text-gray-700",children:"📊 Status"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-200",children:n&&n.length>0?n.map((a,s)=>e.jsxs("tr",{className:"table-row",style:{animationDelay:`${s*.1}s`},children:[e.jsx("td",{className:"whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900",children:a.user.name}),e.jsx("td",{className:"whitespace-nowrap px-6 py-4 text-sm text-gray-700 font-medium",children:a.client_name}),e.jsx("td",{className:"whitespace-nowrap px-6 py-4 text-sm font-bold text-green-600",children:r(a.received_amount)}),e.jsx("td",{className:"whitespace-nowrap px-6 py-4 text-sm text-gray-600",children:d(a.payment_date)}),e.jsx("td",{className:"whitespace-nowrap px-6 py-4 text-sm",children:o(a.status)})]},a.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:"5",className:"px-6 py-12 text-center",children:e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("div",{className:"w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4",children:e.jsx("span",{className:"text-3xl",children:"📋"})}),e.jsx("p",{className:"text-gray-500 text-lg font-medium",children:"Nenhuma venda recente"}),e.jsx("p",{className:"text-gray-400 text-sm",children:"As vendas aparecerão aqui assim que forem registradas"})]})})})})]})})]}),e.jsx("div",{className:"stat-card p-8 relative z-10",children:e.jsxs("div",{className:"flex items-center justify-between text-white",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center mb-3",children:[e.jsx("span",{className:"text-3xl mr-3",children:"⚡"}),e.jsx("h4",{className:"text-2xl font-bold",children:"Ações Rápidas"})]}),e.jsx("p",{className:"text-white/90 text-lg",children:"Gerencie o sistema BBKits com facilidade"})]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("a",{href:"/admin/sales",className:"quick-action-btn px-6 py-3 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105",children:"✅ Aprovar Vendas"}),e.jsx("a",{href:"/sales",className:"quick-action-btn px-6 py-3 text-sm font-semibold text-white rounded-2xl transition-all duration-300 hover:scale-105",children:"📊 Ver Relatórios"})]})]})})]})})]})]}),e.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})]})}export{u as default};
