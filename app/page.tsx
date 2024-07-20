import Script from "next/script";
import Background from "./background";
import Foreground from "./foreground";

export default function Home() {
	return (
		<>
			{/* <!-- Event snippet for 페이지 조회 conversion page --> */}
			<Script id="ga-event-conversion">
				{`
				gtag('event', 'conversion', {
				'send_to': 'AW-16636190539/6B1PCO3mysAZEMu-4Pw9',
				'value': 1.0,
				'currency': 'KRW'
				});
				`}
			</Script>
			<Background />
			<Foreground />
		</>
	);
}
