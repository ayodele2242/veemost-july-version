
import { useRouter, useSearchParams } from 'next/navigation';
import SecondHeader from '@/components/SecondHeader';
import Container from '../Container';
import { useState, useEffect } from 'react';
import { ApiRequestService } from '@/services/apiRequest.service';
import { CheckIcon } from '@heroicons/react/24/outline';
import Spinner from '../Spinner';
import Link from 'next/link';

interface TokenProps {
    token: string;
  }

  interface ResponseDataItem {
    status: string;
    message: string;
   
}

const VerifyToken = ({ token }: TokenProps) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const tokenPa = searchParams.get('token');
    const [backendResponse, setBackendResponse] = useState<string | null>(null);
    const { push } = useRouter();
    

    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true);
            const payload = {
                keyd: token,
            };

            try {
                const response = await ApiRequestService.callAPI<ResponseDataItem>(JSON.stringify(payload), 'auth/activate_account');
                const responseData = response.data;

                if (response.status === 200) {
                    const { status, message, data, totalRecords } = responseData;
                    const redirectUrl = sessionStorage.getItem('redirectUrl') || '/auth/login';
                    sessionStorage.removeItem('redirectUrl'); // Clean up
                
              
                    setTimeout(() => {
                        push(redirectUrl);
                    }, 6000);
                    setError(null);
                } else {
                    setBackendResponse(responseData.message);
                }
            } catch (error: any) {
                console.error('Failed to fetch product details:', error);
                setError(error.data.message || error?.statusText);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchDetails();
        }
    }, [token]);


    /*if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }*/

    return (
        <main className="w-full overflow-hidden">
            <SecondHeader />
            <Container>
            {loading ? (
                    <div className="text-center py-10 flex justify-center items-center gap-2">
                        <Spinner size='sm' />
                        <div>Verifying account registration...</div>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 flex justify-center items-center">
                        <p className="text-red-500">Error: {error}</p>
                    </div>
                ) : (
                    <div className="flex flex-col w-full justify-center items-center mt-5">
                        <div className="w-[136px] h-[136px] bg-[#23A26D] rounded-full p-8 font-semibold 
                            flex justify-center items-center fadeIn text-white mb-3">
                            <CheckIcon />
                        </div>
                        <h2 className="text-2xl mb-4 mt-2 font-bold">Account successfully activated</h2>
                        <p className="mb-4 mt-5"><Link href="/auth/login">Login here</Link></p>

                       

                        
                    </div>
                )}
            </Container>
        </main>
    );
};

export default VerifyToken;
