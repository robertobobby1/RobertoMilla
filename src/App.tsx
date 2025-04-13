import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Index from './pages/Index';
import { Toaster } from './components/ui/toaster';

const App = () => (
    <>
        <Toaster />
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </>
);

export default App;
