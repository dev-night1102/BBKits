import{j as e,r as o,x as N,Q as F,t as c,V as p}from"./app-BeFV6bcw.js";import{A as k}from"./AuthenticatedLayout-B5uWgDJv.js";import{z as x}from"./transition-BO4nr4C_.js";import{L as m}from"./dialog-DfAP2BmH.js";function C({className:t="",disabled:s,children:r,...n}){return e.jsx("button",{...n,className:`inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:bg-red-700 ${s&&"opacity-25"} `+t,disabled:s,children:r})}function D({type:t="button",className:s="",disabled:r,children:n,...i}){return e.jsx("button",{...i,type:t,className:`inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-gray-700 shadow-sm transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 ${r&&"opacity-25"} `+s,disabled:r,children:n})}function E({title:t,titleId:s,...r},n){return o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor","aria-hidden":"true","data-slot":"icon",ref:n,"aria-labelledby":s},r),t?o.createElement("title",{id:s},t):null,o.createElement("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"}))}const B=o.forwardRef(E);function M({show:t,onClose:s,onConfirm:r,title:n,message:i,processing:d}){return e.jsx(x.Root,{show:t,as:o.Fragment,children:e.jsxs(m,{as:"div",className:"relative z-50",onClose:s,children:[e.jsx(x.Child,{as:o.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:e.jsx("div",{className:"fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"})}),e.jsx("div",{className:"fixed inset-0 z-10 overflow-y-auto",children:e.jsx("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:e.jsx(x.Child,{as:o.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:e.jsxs(m.Panel,{className:"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:[e.jsx("div",{className:"bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4",children:e.jsxs("div",{className:"sm:flex sm:items-start",children:[e.jsx("div",{className:"mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10",children:e.jsx(B,{className:"h-6 w-6 text-red-600","aria-hidden":"true"})}),e.jsxs("div",{className:"mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left",children:[e.jsx(m.Title,{as:"h3",className:"text-base font-semibold leading-6 text-gray-900",children:n}),e.jsx("div",{className:"mt-2",children:e.jsx("p",{className:"text-sm text-gray-500",children:i})})]})]})}),e.jsxs("div",{className:"bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6",children:[e.jsx(C,{onClick:r,disabled:d,className:"sm:ml-3",children:d?"Excluindo...":"Excluir"}),e.jsx(D,{onClick:s,disabled:d,children:"Cancelar"})]})]})})})})]})})}function _({sales:t}){const[s,r]=o.useState(!1),[n,i]=o.useState(null),{delete:d,processing:g}=N(),f=a=>{i(a),r(!0)},u=()=>{n&&d(route("sales.destroy",n.id),{onSuccess:()=>{p.success("Venda excluída com sucesso!"),r(!1),i(null)},onError:()=>{p.error("Erro ao excluir a venda."),r(!1),i(null)}})},b=()=>{r(!1),i(null)},y=a=>{const l={pendente:"bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300",aprovado:"bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300",recusado:"bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",cancelado:"bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300",estornado:"bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300"},v={pendente:"Pendente",aprovado:"Aprovado",recusado:"Recusado",cancelado:"Cancelado",estornado:"Estornado"},w={pendente:"⏳",aprovado:"✅",recusado:"❌",cancelado:"⚪",estornado:"🔄"};return e.jsxs("span",{className:`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${l[a]} shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105`,children:[e.jsx("span",{children:w[a]}),v[a]]})},h=a=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(a),j=a=>new Date(a).toLocaleDateString("pt-BR");return e.jsxs(e.Fragment,{children:[e.jsx(F,{title:"Vendas"}),e.jsx("style",{children:`
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

                .sales-bg {
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

                .table-row {
                    transition: all 0.3s ease;
                    border-radius: 15px;
                    margin: 8px 0;
                }

                .table-row:hover {
                    background: var(--gradient-soft) !important;
                    transform: translateX(5px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                }

                .btn-gradient {
                    background: var(--gradient);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                    border-radius: 15px;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .btn-gradient::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.6s;
                }

                .btn-gradient:hover::before {
                    left: 100%;
                }

                .btn-gradient:hover {
                    transform: translateY(-3px);
                    box-shadow: var(--shadow-hover);
                }

                .action-btn {
                    padding: 8px 16px;
                    border-radius: 10px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-block;
                    margin: 2px;
                }

                .action-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                }

                .action-btn-view {
                    background: linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%);
                    color: white;
                }

                .action-btn-edit {
                    background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
                    color: white;
                }

                .action-btn-delete {
                    background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
                    color: white;
                }

                .floating-particles {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: 1;
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

                .header-gradient {
                    background: var(--gradient);
                    color: white;
                    border-radius: 20px;
                    padding: 20px;
                    margin-bottom: 30px;
                    box-shadow: var(--shadow);
                }

                .table-header {
                    background: var(--gradient);
                    color: white;
                    border-radius: 15px 15px 0 0;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .empty-state {
                    background: var(--gradient-soft);
                    border-radius: 25px;
                    padding: 60px 40px;
                    text-align: center;
                    box-shadow: var(--shadow);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }

                .empty-state:hover {
                    border-color: var(--primary-color);
                    box-shadow: var(--shadow-hover);
                }

                .pagination-btn {
                    border-radius: 10px;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }

                .pagination-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }

                .pagination-active {
                    background: var(--gradient) !important;
                    color: white !important;
                }
            `}),e.jsx("div",{className:"floating-particles",children:Array.from({length:15},(a,l)=>e.jsx("div",{className:"particle",style:{left:Math.random()*100+"%",width:Math.random()*8+4+"px",height:Math.random()*8+4+"px",animationDelay:Math.random()*15+"s",animationDuration:Math.random()*10+10+"s"}},l))}),e.jsx(k,{header:e.jsx("div",{className:"header-gradient",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4",children:[e.jsx("div",{className:"w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl backdrop-blur-sm",children:e.jsx("i",{className:"fas fa-chart-line"})}),e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold leading-tight",children:"💼 Minhas Vendas"}),e.jsx("p",{className:"text-white/80 text-sm",children:"Gerencie suas vendas com elegância"})]})]}),e.jsx(c,{href:route("sales.create"),children:e.jsxs("button",{className:"btn-gradient text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition duration-300",children:[e.jsx("i",{className:"fas fa-plus mr-2"}),"Nova Venda"]})})]})}),children:e.jsx("div",{className:"sales-bg relative z-10",children:e.jsx("div",{className:"py-12",children:e.jsx("div",{className:"mx-auto max-w-7xl sm:px-6 lg:px-8",children:e.jsx("div",{className:"card-gradient overflow-hidden",children:e.jsx("div",{className:"p-8 text-gray-900",children:t.data.length===0?e.jsxs("div",{className:"empty-state",children:[e.jsx("div",{className:"w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-pink-100 to-yellow-100 rounded-full flex items-center justify-center",children:e.jsx("i",{className:"fas fa-shopping-bag text-4xl text-pink-500"})}),e.jsx("h3",{className:"text-2xl font-bold text-gray-900 mb-4",children:"Nenhuma venda registrada ainda! 🌟"}),e.jsx("p",{className:"text-lg text-gray-600 mb-8 max-w-md mx-auto",children:"Que tal começar sua jornada de sucesso registrando sua primeira venda? Cada grande vendedora começou com uma única venda! 💪"}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 justify-center",children:[e.jsx(c,{href:route("sales.create"),children:e.jsxs("button",{className:"btn-gradient text-white px-10 py-4 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl",children:[e.jsx("i",{className:"fas fa-rocket mr-3"}),"Registrar Primeira Venda"]})}),e.jsxs("button",{className:"bg-white/80 text-gray-700 hover:bg-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition duration-300 border border-gray-200",children:[e.jsx("i",{className:"fas fa-question-circle mr-2"}),"Como Funciona?"]})]})]}):e.jsxs("div",{className:"overflow-x-auto",children:[e.jsx("div",{className:"mb-6 bg-gradient-to-r from-pink-50 to-yellow-50 border border-pink-200 rounded-xl p-4",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center",children:e.jsx("i",{className:"fas fa-chart-bar text-white"})}),e.jsxs("div",{children:[e.jsxs("h3",{className:"font-semibold text-gray-800",children:["Total de ",t.data.length," vendas registradas"]}),e.jsx("p",{className:"text-sm text-gray-600",children:"Continue assim! Cada venda te aproxima do sucesso! 🎯"})]})]})}),e.jsx("div",{className:"bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent hover:border-pink-200 transition-all duration-300",children:e.jsxs("table",{className:"min-w-full",children:[e.jsx("thead",{className:"table-header",children:e.jsxs("tr",{children:[e.jsxs("th",{className:"px-6 py-4 text-left text-sm font-bold",children:[e.jsx("i",{className:"fas fa-user mr-2"}),"Cliente"]}),e.jsxs("th",{className:"px-6 py-4 text-left text-sm font-bold",children:[e.jsx("i",{className:"fas fa-money-bill-wave mr-2"}),"Valor Total"]}),e.jsxs("th",{className:"px-6 py-4 text-left text-sm font-bold",children:[e.jsx("i",{className:"fas fa-hand-holding-usd mr-2"}),"Valor Recebido"]}),e.jsxs("th",{className:"px-6 py-4 text-left text-sm font-bold",children:[e.jsx("i",{className:"fas fa-calendar-alt mr-2"}),"Data Pagamento"]}),e.jsxs("th",{className:"px-6 py-4 text-left text-sm font-bold",children:[e.jsx("i",{className:"fas fa-flag mr-2"}),"Status"]}),e.jsxs("th",{className:"px-6 py-4 text-left text-sm font-bold",children:[e.jsx("i",{className:"fas fa-cogs mr-2"}),"Ações"]})]})}),e.jsx("tbody",{className:"bg-white",children:t.data.map((a,l)=>e.jsxs("tr",{className:`table-row ${l%2===0?"bg-gray-50":"bg-white"}`,children:[e.jsx("td",{className:"px-6 py-4 text-sm font-semibold text-gray-900",children:e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-10 h-10 bg-gradient-to-br from-pink-400 to-yellow-400 rounded-full flex items-center justify-center text-white font-bold",children:a.client_name.charAt(0).toUpperCase()}),a.client_name]})}),e.jsx("td",{className:"px-6 py-4 text-sm font-bold text-green-600",children:h(a.total_amount)}),e.jsx("td",{className:"px-6 py-4 text-sm font-bold text-blue-600",children:h(a.received_amount)}),e.jsxs("td",{className:"px-6 py-4 text-sm text-gray-600 font-medium",children:["📅 ",j(a.payment_date)]}),e.jsx("td",{className:"px-6 py-4 text-sm",children:y(a.status)}),e.jsx("td",{className:"px-6 py-4 text-sm font-medium",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs(c,{href:route("sales.show",a.id),className:"action-btn action-btn-view",children:[e.jsx("i",{className:"fas fa-eye mr-1"}),"Ver"]}),a.status==="pendente"&&e.jsxs(e.Fragment,{children:[e.jsxs(c,{href:route("sales.edit",a.id),className:"action-btn action-btn-edit",children:[e.jsx("i",{className:"fas fa-edit mr-1"}),"Editar"]}),e.jsxs("button",{onClick:()=>f(a),className:"action-btn action-btn-delete",children:[e.jsx("i",{className:"fas fa-trash mr-1"}),"Excluir"]})]})]})})]},a.id))})]})}),t.links&&t.links.length>0&&e.jsx("div",{className:"mt-8 bg-white rounded-2xl p-6 shadow-lg",children:e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-4",children:[e.jsxs("div",{className:"text-sm text-gray-700 font-medium bg-gray-50 px-4 py-2 rounded-full",children:["📊 Mostrando ",t.from," a ",t.to," de ",t.total," resultados"]}),e.jsx("div",{className:"flex gap-2",children:t.links.filter(a=>a&&a.url!==null).map((a,l)=>a.url?e.jsx(c,{href:a.url,className:`pagination-btn px-4 py-2 text-sm ${a.active?"pagination-active":"bg-gray-100 text-gray-700 hover:bg-gray-200"}`,dangerouslySetInnerHTML:{__html:a.label}},l):e.jsx("span",{className:"pagination-btn px-4 py-2 text-sm bg-gray-50 text-gray-400 cursor-not-allowed",dangerouslySetInnerHTML:{__html:a.label}},l))})]})})]})})})})})})}),e.jsx(M,{show:s,onClose:b,onConfirm:u,title:"Excluir Venda",message:n?`Tem certeza que deseja excluir a venda para ${n.client_name}? Esta ação não pode ser desfeita.`:"",processing:g}),e.jsx("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})]})}export{_ as default};
