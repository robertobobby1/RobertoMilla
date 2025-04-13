import { useToast } from '@/hooks/use-toast';
import { Toast, ToastDescription, ToastProvider, ToastViewport } from '@/components/ui/toast';
import { Check, TriangleAlert, X } from 'lucide-react';
import { cn } from '../../helpers/Utils';

export function Toaster() {
    const { toasts } = useToast();

    return (
        <ToastProvider>
            {toasts.map(function ({ id, text, toasttype, action, ...props }) {
                const isSuccess = toasttype === 'success';
                const bgParent = isSuccess ? 'bg-green-100' : 'bg-red-100';
                const borderParent = isSuccess ? 'border-green-300' : 'border-red-300';
                const bgLeft = isSuccess ? 'bg-green-500' : 'bg-red-500';
                return (
                    <Toast key={id} {...props} className={cn('flex flex-row p-2 rounded-2xl', bgParent, borderParent)}>
                        <div className={cn('rounded-2xl', bgLeft)}>
                            {isSuccess && (
                                <div className="flex bg-white rounded-full text-primary h-7 w-7 m-2">
                                    <Check strokeWidth="3.5" className="m-auto" size={16} />
                                </div>
                            )}
                            {!isSuccess && <TriangleAlert size={28} className="text-white m-2" />}
                        </div>
                        <ToastDescription className="font-semibold flex-1 mr-auto">{text}</ToastDescription>
                        <div
                            className="rounded-lg hover:bg-white hover:cursor-pointer h-8 w-8"
                            onClick={() => props.onOpenChange(false)}
                        >
                            <X size={16} strokeWidth="3.5" className="m-auto h-full" />
                        </div>
                    </Toast>
                );
            })}
            <ToastViewport />
        </ToastProvider>
    );
}
