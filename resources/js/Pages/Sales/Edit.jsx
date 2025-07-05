import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import toast from 'react-hot-toast';

export default function Edit({ sale }) {
    // Format date for HTML input (yyyy-MM-dd)
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    const { data, setData, put, processing } = useForm({
        client_name: sale.client_name || '',
        total_amount: sale.total_amount ? parseFloat(sale.total_amount).toString() : '',
        shipping_amount: sale.shipping_amount ? parseFloat(sale.shipping_amount).toString() : '',
        payment_method: sale.payment_method || 'pix',
        received_amount: sale.received_amount ? parseFloat(sale.received_amount).toString() : '',
        payment_date: formatDateForInput(sale.payment_date),
        payment_receipt: null,
        notes: sale.notes || ''
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('sales.update', sale.id), {
            onSuccess: () => {
                toast.success('Venda atualizada com sucesso!');
            },
            onError: (errors) => {
                Object.keys(errors).forEach(key => {
                    toast.error(errors[key]);
                });
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Editar Venda #{sale.id}
                </h2>
            }
        >
            <Head title={`Editar Venda #${sale.id} - BBKits`} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {sale.status !== 'pendente' && (
                                <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
                                    <p className="text-sm text-yellow-800">
                                        ⚠️ <strong>Atenção:</strong> Esta venda já foi processada e não pode ser editada.
                                    </p>
                                </div>
                            )}
                            
                            <form onSubmit={submit} className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div>
                                        <InputLabel htmlFor="client_name" value="Nome da Cliente" />
                                        <TextInput
                                            id="client_name"
                                            type="text"
                                            className="mt-1 block w-full"
                                            value={data.client_name}
                                            onChange={(e) => setData('client_name', e.target.value)}
                                            required
                                            disabled={sale.status !== 'pendente'}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="payment_method" value="Forma de Pagamento" />
                                        <select
                                            id="payment_method"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                                            value={data.payment_method}
                                            onChange={(e) => setData('payment_method', e.target.value)}
                                            required
                                            disabled={sale.status !== 'pendente'}
                                        >
                                            <option value="pix">PIX</option>
                                            <option value="boleto">Boleto</option>
                                            <option value="cartao">Cartão</option>
                                            <option value="dinheiro">Dinheiro</option>
                                        </select>
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="total_amount" value="Valor Total do Pedido (R$)" />
                                        <TextInput
                                            id="total_amount"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.total_amount}
                                            onChange={(e) => setData('total_amount', e.target.value)}
                                            required
                                            disabled={sale.status !== 'pendente'}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="shipping_amount" value="Valor do Frete (R$)" />
                                        <TextInput
                                            id="shipping_amount"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.shipping_amount}
                                            onChange={(e) => setData('shipping_amount', e.target.value)}
                                            required
                                            disabled={sale.status !== 'pendente'}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="received_amount" value="Valor Recebido (R$)" />
                                        <TextInput
                                            id="received_amount"
                                            type="number"
                                            step="0.01"
                                            min="0"
                                            className="mt-1 block w-full"
                                            value={data.received_amount}
                                            onChange={(e) => setData('received_amount', e.target.value)}
                                            required
                                            disabled={sale.status !== 'pendente'}
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="payment_date" value="Data do Pagamento" />
                                        <TextInput
                                            id="payment_date"
                                            type="date"
                                            className="mt-1 block w-full"
                                            value={data.payment_date}
                                            onChange={(e) => setData('payment_date', e.target.value)}
                                            required
                                            disabled={sale.status !== 'pendente'}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="payment_receipt" value="Comprovante de Pagamento" />
                                    {sale.payment_receipt && (
                                        <div className="mb-2">
                                            <p className="text-sm text-gray-600">
                                                Comprovante atual: 
                                                <a 
                                                    href={`/storage/${sale.payment_receipt}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="ml-1 text-blue-600 hover:text-blue-800 underline"
                                                >
                                                    Ver arquivo
                                                </a>
                                            </p>
                                        </div>
                                    )}
                                    <input
                                        id="payment_receipt"
                                        type="file"
                                        accept="image/*,application/pdf"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 disabled:opacity-50"
                                        onChange={(e) => setData('payment_receipt', e.target.files[0])}
                                        disabled={sale.status !== 'pendente'}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        {sale.status === 'pendente' ? 
                                            'Deixe em branco para manter o comprovante atual. Formatos aceitos: JPG, PNG, PDF (máx. 2MB)' :
                                            'Não é possível alterar o comprovante de uma venda já processada.'
                                        }
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="notes" value="Observações (opcional)" />
                                    <textarea
                                        id="notes"
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:bg-gray-100"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Informações adicionais sobre a venda..."
                                        disabled={sale.status !== 'pendente'}
                                    />
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <a
                                        href={route('sales.index')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Cancelar
                                    </a>
                                    {sale.status === 'pendente' && (
                                        <PrimaryButton disabled={processing}>
                                            {processing ? 'Salvando...' : 'Atualizar Venda'}
                                        </PrimaryButton>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}