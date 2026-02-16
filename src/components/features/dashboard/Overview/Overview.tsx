import ContactUsSummery from "./ContactUsSummery";
import RecentOverview from "./RecentOverview";
import TopPerformingServices from "./TopPerformingServices";

export default function Overview() {
  return (
    <div className="p-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactUsSummery />
        <TopPerformingServices />
      </div>
      <div className="mt-8">
        <div>
          <RecentOverview />
        </div>
      </div>
    </div>
  );
}
