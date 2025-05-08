import { Calculator } from '@/components/Calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-8">감정이 있는 계산기</h1>
      <Calculator />
    </main>
  );
}
