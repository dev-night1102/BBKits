import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import toast from 'react-hot-toast';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        client_name: '',
        total_amount: '',
        shipping_amount: '',
        payment_method: 'pix',
        received_amount: '',
        payment_date: '',
        payment_receipt: null,
        notes: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('sales.store'), {
            onSuccess: () => {
                toast.success('Venda registrada com sucesso!');
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
                    Registrar Nova Venda
                </h2>
            }
        >
            <Head title="Registrar Venda" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
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
                                        />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="payment_method" value="Forma de Pagamento" />
                                        <select
                                            id="payment_method"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                            value={data.payment_method}
                                            onChange={(e) => setData('payment_method', e.target.value)}
                                            required
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
                                        />
                                    </div>
                                </div>

                                <div>
                                    <InputLabel htmlFor="payment_receipt" value="Comprovante de Pagamento" />
                                    <input
                                        id="payment_receipt"
                                        type="file"
                                        accept="image/*,application/pdf"
                                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                        onChange={(e) => setData('payment_receipt', e.target.files[0])}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        Formatos aceitos: JPG, PNG, PDF (máx. 2MB)
                                    </p>
                                </div>

                                <div>
                                    <InputLabel htmlFor="notes" value="Observações (opcional)" />
                                    <textarea
                                        id="notes"
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        placeholder="Informações adicionais sobre a venda..."
                                    />
                                </div>

                                <div className="flex items-center justify-end space-x-4">
                                    <a
                                        href={route('sales.index')}
                                        className="text-gray-600 hover:text-gray-900"
                                    >
                                        Cancelar
                                    </a>
                                    <PrimaryButton disabled={processing}>
                                        {processing ? 'Salvando...' : 'Registrar Venda'}
                                    </PrimaryButton>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}