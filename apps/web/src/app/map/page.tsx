import dynamic from 'next/dynamic';
import SwitchBar from "@/components/switchBar";

const MapComponentWithNoSSR = dynamic(() => import('@/components/MapComponent'), {
  ssr: false, // This line disables server-side rendering
});

export default function Home() {
  return (
    <div>
      <MapComponentWithNoSSR />
      <SwitchBar />
    </div>
  );
}