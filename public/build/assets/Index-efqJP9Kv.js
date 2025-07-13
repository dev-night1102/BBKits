import{J as v,r as x,j as e,Q as f}from"./app-V-LEp6ae.js";import{A as j}from"./AuthenticatedLayout-Deu-9LSr.js";import"./transition-CQSrkXg5.js";function k({salesData:n,commissionData:N,totalStats:r}){const{auth:w}=v().props,[d,m]=x.useState(new Date().getMonth()+1),[o,p]=x.useState(new Date().getFullYear()),a=s=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(s),h=s=>s>=6e4?{level:"Elite",color:"bg-gradient-to-r from-purple-500 to-pink-500",icon:"👑"}:s>=5e4?{level:"Avançada",color:"bg-gradient-to-r from-blue-500 to-cyan-500",icon:"🏆"}:s>=4e4?{level:"Intermediária",color:"bg-gradient-to-r from-green-500 to-emerald-500",icon:"⭐"}:{level:"Iniciante",color:"bg-gradient-to-r from-gray-400 to-gray-600",icon:"🌟"},g=[{value:1,label:"Janeiro"},{value:2,label:"Fevereiro"},{value:3,label:"Março"},{value:4,label:"Abril"},{value:5,label:"Maio"},{value:6,label:"Junho"},{value:7,label:"Julho"},{value:8,label:"Agosto"},{value:9,label:"Setembro"},{value:10,label:"Outubro"},{value:11,label:"Novembro"},{value:12,label:"Dezembro"}],b=new Date().getFullYear(),u=Array.from({length:3},(s,l)=>b-l),t=s=>{const l=`/admin/export/${s}?month=${d}&year=${o}`;window.open(l,"_blank")};return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:"Relatórios de Vendas e Comissões - BBKits"}),e.jsx("style",{children:`
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
                    --shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
                    --shadow-hover: 0 25px 50px rgba(0, 0, 0, 0.2);
                }

                * {
                    font-family: 'Poppins', sans-serif;
                }

                .reports-bg {
                    background: linear-gradient(135deg, #F5E6D3 0%, #FFFFFF 50%, #F0F9FF 100%);
                    min-height: 100vh;
                }

                .card-gradient {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    box-shadow: var(--shadow);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                    backdrop-filter: blur(10px);
                }

                .card-gradient:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-hover);
                    border-color: var(--primary-color);
                }

                .stat-card {
                    border-radius: 20px;
                    padding: 24px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .stat-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    transition: all 0.3s ease;
                }

                .stat-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                }

                .header-gradient {
                    background: var(--gradient);
                    color: white;
                    border-radius: 20px;
                    padding: 24px;
                    margin-bottom: 30px;
                    box-shadow: var(--shadow);
                    position: relative;
                    overflow: hidden;
                }

                .seller-card {
                    background: white;
                    border-radius: 20px;
                    padding: 24px;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .seller-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
                    border-color: var(--primary-color);
                }

                .level-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    border-radius: 20px;
                    color: white;
                    font-weight: 600;
                    font-size: 14px;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .export-btn {
                    background: var(--gradient);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    padding: 12px 24px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }

                .export-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
                }

                .filter-select {
                    background: white;
                    border: 2px solid #E5E7EB;
                    border-radius: 12px;
                    padding: 12px 16px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .filter-select:focus {
                    outline: none;
                    border-color: var(--primary-color);
                    box-shadow: 0 0 0 3px rgba(212, 165, 116, 0.1);
                }

                .progress-bar {
                    background: var(--gradient);
                    height: 8px;
                    border-radius: 4px;
                    transition: width 1s ease;
                }

                .table-row {
                    transition: all 0.3s ease;
                }

                .table-row:hover {
                    background: var(--gradient-soft) !important;
                    transform: translateX(4px);
                }
            `}),e.jsx(j,{header:e.jsx("div",{className:"header-gradient",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl backdrop-blur-sm",children:"📊"}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-3xl font-bold leading-tight",children:"Relatórios de Vendas e Comissões"}),e.jsx("p",{className:"text-white/80 text-lg",children:"Visão detalhada por vendedora e período"})]})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("button",{onClick:()=>t("sales"),className:"export-btn",children:"📊 Exportar Vendas"}),e.jsx("button",{onClick:()=>t("commissions"),className:"export-btn",children:"💰 Exportar Comissões"})]})]})}),children:e.jsx("div",{className:"reports-bg",children:e.jsx("div",{className:"py-12",children:e.jsxs("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:[e.jsx("div",{className:"card-gradient p-6 mb-8",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-800",children:"Filtros"}),e.jsxs("div",{className:"flex gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Mês"}),e.jsx("select",{value:d,onChange:s=>m(parseInt(s.target.value)),className:"filter-select",children:g.map(s=>e.jsx("option",{value:s.value,children:s.label},s.value))})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-2",children:"Ano"}),e.jsx("select",{value:o,onChange:s=>p(parseInt(s.target.value)),className:"filter-select",children:u.map(s=>e.jsx("option",{value:s,children:s},s))})]})]})]})}),e.jsxs("div",{className:"grid gap-8 mb-8 md:grid-cols-2 xl:grid-cols-4",children:[e.jsx("div",{className:"stat-card bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl",children:"👥"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-blue-600 font-medium",children:"Total Vendedoras"}),e.jsx("p",{className:"text-2xl font-bold text-blue-800",children:(r==null?void 0:r.totalSellers)||0})]})]})}),e.jsx("div",{className:"stat-card bg-gradient-to-r from-green-50 to-green-100 border-green-200",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl",children:"💰"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-green-600 font-medium",children:"Total Vendas"}),e.jsx("p",{className:"text-2xl font-bold text-green-800",children:a((r==null?void 0:r.totalSales)||0)})]})]})}),e.jsx("div",{className:"stat-card bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white text-xl",children:"🎯"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-purple-600 font-medium",children:"Total Comissões"}),e.jsx("p",{className:"text-2xl font-bold text-purple-800",children:a((r==null?void 0:r.totalCommissions)||0)})]})]})}),e.jsx("div",{className:"stat-card bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200",children:e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white text-xl",children:"🏆"}),e.jsxs("div",{children:[e.jsx("p",{className:"text-sm text-orange-600 font-medium",children:"Meta Atingida"}),e.jsx("p",{className:"text-2xl font-bold text-orange-800",children:(r==null?void 0:r.metaAchieved)||0})]})]})})]}),e.jsxs("div",{className:"card-gradient p-8 mb-8",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-800 mb-6",children:"Vendas por Vendedora"}),e.jsx("div",{className:"grid gap-6",children:n&&n.length>0?n.map((s,l)=>{const i=h(s.commissionBase),c=Math.min(s.commissionBase/6e4*100,100);return e.jsxs("div",{className:"seller-card",children:[e.jsxs("div",{className:"flex items-center justify-between mb-4",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl font-bold",children:s.name.charAt(0)}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-xl font-bold text-gray-800",children:s.name}),e.jsxs("div",{className:`level-badge ${i.color}`,children:[e.jsx("span",{children:i.icon}),e.jsx("span",{children:i.level})]})]})]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-2xl font-bold text-green-600",children:a(s.totalSales)}),e.jsxs("div",{className:"text-sm text-gray-500",children:[s.salesCount," vendas"]})]})]}),e.jsxs("div",{className:"grid grid-cols-2 md:grid-cols-4 gap-4 mb-4",children:[e.jsxs("div",{className:"text-center p-3 bg-blue-50 rounded-lg",children:[e.jsx("div",{className:"text-lg font-bold text-blue-600",children:a(s.totalSales)}),e.jsx("div",{className:"text-sm text-blue-500",children:"Total Vendas"})]}),e.jsxs("div",{className:"text-center p-3 bg-green-50 rounded-lg",children:[e.jsx("div",{className:"text-lg font-bold text-green-600",children:a(s.approvedSales)}),e.jsx("div",{className:"text-sm text-green-500",children:"Aprovadas"})]}),e.jsxs("div",{className:"text-center p-3 bg-purple-50 rounded-lg",children:[e.jsx("div",{className:"text-lg font-bold text-purple-600",children:a(s.commissionBase)}),e.jsx("div",{className:"text-sm text-purple-500",children:"Base Comissão"})]}),e.jsxs("div",{className:"text-center p-3 bg-orange-50 rounded-lg",children:[e.jsx("div",{className:"text-lg font-bold text-orange-600",children:a(s.totalCommission)}),e.jsx("div",{className:"text-sm text-orange-500",children:"Comissão Total"})]})]}),e.jsxs("div",{className:"mt-4",children:[e.jsxs("div",{className:"flex justify-between text-sm text-gray-600 mb-2",children:[e.jsx("span",{children:"Progresso para Elite (R$ 60.000)"}),e.jsxs("span",{children:[c.toFixed(1),"%"]})]}),e.jsx("div",{className:"w-full bg-gray-200 rounded-full h-2",children:e.jsx("div",{className:"progress-bar rounded-full h-2",style:{width:`${c}%`}})})]})]},s.id)}):e.jsxs("div",{className:"text-center py-12",children:[e.jsx("div",{className:"w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx("span",{className:"text-4xl",children:"📊"})}),e.jsx("h3",{className:"text-xl font-bold text-gray-800 mb-2",children:"Nenhuma venda encontrada"}),e.jsx("p",{className:"text-gray-600",children:"Não há vendas registradas para o período selecionado."})]})})]}),e.jsxs("div",{className:"card-gradient p-8 text-center",children:[e.jsx("h3",{className:"text-2xl font-bold text-gray-800 mb-4",children:"Exportar Relatórios"}),e.jsx("p",{className:"text-gray-600 mb-6",children:"Baixe relatórios detalhados em formato Excel/CSV"}),e.jsxs("div",{className:"flex justify-center gap-4",children:[e.jsxs("button",{onClick:()=>t("sales"),className:"export-btn flex items-center gap-2",children:[e.jsx("span",{children:"📊"}),"Exportar Vendas"]}),e.jsxs("button",{onClick:()=>t("commissions"),className:"export-btn flex items-center gap-2",children:[e.jsx("span",{children:"💰"}),"Exportar Comissões"]})]})]})]})})})})]})}export{k as default};
