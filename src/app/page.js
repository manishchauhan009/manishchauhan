import Home from "../components/sections/Home";
import Services from "../components/sections/Services";
import TrustStats from "../components/sections/TrustStats";
import SiteOverview from "../components/sections/SiteOverview";

export default function HomePage() {
    return (
        <main>
            <Home />
            <TrustStats />
            <Services />
            <SiteOverview />
        </main>
    );
}
