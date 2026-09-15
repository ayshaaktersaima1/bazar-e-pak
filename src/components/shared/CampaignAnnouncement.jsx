import { serverApi } from "@/lib/server.js";

const CampaignAnnouncement = async () => {
    let campaigns = [];

    try {
        campaigns = await serverApi.get(
            "/api/campaigns/active",
            {},
            {
                auth: false,
            },
        );
    } catch {
        campaigns = [];
    }

    if (!Array.isArray(campaigns) || campaigns.length === 0) {
        return null;
    }

    // Show the first active campaign in the announcement area.
    const campaign = campaigns[0];

    const hasDiscount =
        campaign.discountPercent !== null &&
        campaign.discountPercent !== undefined;

    const backgroundStyle = campaign.banner
        ? {
            backgroundImage: `linear-gradient(rgba(0,27,8,0.88), rgba(0,27,8,0.88)), url("${campaign.banner}")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        }
        : undefined;

    return (
        <section
            className="w-full bg-[#002B12] text-white"
            style={backgroundStyle}
        >
            <div className="mx-auto flex w-[92%] max-w-[1600px] flex-col items-center justify-center gap-1 py-3 text-center sm:flex-row sm:gap-3">
                <p className="text-sm font-bold uppercase tracking-wide text-[#E8BB44] sm:text-base">
                    {campaign.name}
                </p>

                {campaign.description && (
                    <>
                        <span className="hidden text-[#E8BB44] sm:inline">
                            •
                        </span>

                        <p className="text-xs text-white/90 sm:text-sm">
                            {campaign.description}
                        </p>
                    </>
                )}

                {hasDiscount && (
                    <span className="rounded-full bg-[#E8BB44] px-3 py-1 text-xs font-bold text-[#001B08] sm:text-sm">
                        {campaign.discountPercent}% OFF
                    </span>
                )}
            </div>
        </section>
    );
};

export default CampaignAnnouncement;