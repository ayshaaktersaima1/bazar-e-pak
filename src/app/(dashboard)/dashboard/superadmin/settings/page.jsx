"use client";

import { useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";
import toast from "react-hot-toast";

import useApi from "@/hooks/use-api";

const defaults = {
    site: {
        siteName: "Bazar-e-Pak",
        tagline: "Discover trusted Pakistani businesses and products",
    },
    contact: {
        email: "support@bazarepak.com",
        phone: "03001234567",
        whatsapp: "03001234567",
        address: "Pakistan",
    },
    localization: {
        currency: "PKR",
        country: "Pakistan",
        timezone: "Asia/Karachi",
        defaultLocale: "en",
    },
};

const mergeDefaults = (defaultValues, savedValues = {}) => {
    const result = { ...defaultValues };

    Object.keys(defaultValues).forEach((key) => {
        const saved = savedValues?.[key];

        if (
            saved !== undefined &&
            saved !== null &&
            String(saved).trim() !== ""
        ) {
            result[key] = saved;
        }
    });

    return result;
};

const SettingsPage = () => {
    const api = useApi();

    const [settings, setSettings] = useState({
        site: null,
        contact: null,
        localization: null,
    });

    const [loading, setLoading] = useState(true);
    const [savingKey, setSavingKey] = useState(null);

    const loadSettings = async () => {
        setLoading(true);

        const result = await api.get(
            "/api/settings",
            {},
            {
                showError: true,
            },
        );

        if (result?.success) {
            const rows = Array.isArray(result.data) ? result.data : [];

            const site = rows.find((item) => item.key === "site");
            const contact = rows.find((item) => item.key === "contact");
            const localization = rows.find(
                (item) => item.key === "localization",
            );

            setSettings({
                site: site
                    ? {
                        ...site,
                        value: mergeDefaults(
                            defaults.site,
                            site.value,
                        ),
                    }
                    : null,

                contact: contact
                    ? {
                        ...contact,
                        value: mergeDefaults(
                            defaults.contact,
                            contact.value,
                        ),
                    }
                    : null,

                localization: localization
                    ? {
                        ...localization,
                        value: mergeDefaults(
                            defaults.localization,
                            localization.value,
                        ),
                    }
                    : null,
            });
        }

        setLoading(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            loadSettings();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const updateValue = (key, field, value) => {
        setSettings((current) => ({
            ...current,
            [key]: {
                ...current[key],
                value: {
                    ...(current[key]?.value || {}),
                    [field]: value,
                },
            },
        }));
    };

    const saveSetting = async (key) => {
        const item = settings[key];

        if (!item) return;

        setSavingKey(key);

        const result = await api.put(
            `/api/settings/${key}`,
            {
                value: item.value || {},
                description: item.description || "",
            },
            {},
            {
                showSuccess: false,
            },
        );

        if (result?.success) {
            toast.success(`${key} settings updated successfully.`);

            setSettings((current) => ({
                ...current,
                [key]: result.data,
            }));
        }

        setSavingKey(null);
    };

    if (loading) {
        return (
            <div className="p-6 text-sm text-gray-500">
                Loading platform settings...
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-2xl font-bold text-[#001B08]">
                    Platform Settings
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage website-wide information without editing code.
                </p>
            </div>

            {!settings.site &&
                !settings.contact &&
                !settings.localization ? (
                <div className="rounded-xl bg-white p-10 text-center shadow-sm">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#F7F5EF] text-[#001B08]">
                        <Settings size={20} />
                    </div>

                    <h2 className="mt-4 font-bold text-[#001B08]">
                        No settings found
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Create the default settings first.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {settings.site && (
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E8BB44]">
                                        Website
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-[#001B08]">
                                        Site Settings
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Control the basic identity of Bazar-e-Pak.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => saveSetting("site")}
                                    disabled={savingKey === "site"}
                                    className="inline-flex items-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08] disabled:opacity-50"
                                >
                                    <Save size={15} />
                                    {savingKey === "site"
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Site Name
                                    </label>

                                    <input
                                        type="text"
                                        value={settings.site.value.siteName}
                                        onChange={(event) =>
                                            updateValue(
                                                "site",
                                                "siteName",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Tagline
                                    </label>

                                    <input
                                        type="text"
                                        value={settings.site.value.tagline}
                                        onChange={(event) =>
                                            updateValue(
                                                "site",
                                                "tagline",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {settings.contact && (
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E8BB44]">
                                        Public Information
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-[#001B08]">
                                        Contact Settings
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Information shown in the footer, contact page and other public areas.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => saveSetting("contact")}
                                    disabled={savingKey === "contact"}
                                    className="inline-flex items-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08] disabled:opacity-50"
                                >
                                    <Save size={15} />
                                    {savingKey === "contact"
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        value={settings.contact.value.email}
                                        onChange={(event) =>
                                            updateValue(
                                                "contact",
                                                "email",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Phone
                                    </label>

                                    <input
                                        type="text"
                                        value={settings.contact.value.phone}
                                        onChange={(event) =>
                                            updateValue(
                                                "contact",
                                                "phone",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        WhatsApp
                                    </label>

                                    <input
                                        type="text"
                                        value={settings.contact.value.whatsapp}
                                        onChange={(event) =>
                                            updateValue(
                                                "contact",
                                                "whatsapp",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Address
                                    </label>

                                    <input
                                        type="text"
                                        value={settings.contact.value.address}
                                        onChange={(event) =>
                                            updateValue(
                                                "contact",
                                                "address",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {settings.localization && (
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#E8BB44]">
                                        Regional
                                    </p>

                                    <h2 className="mt-1 text-xl font-bold text-[#001B08]">
                                        Localization
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-500">
                                        Control the platform&apos;s default regional settings.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        saveSetting("localization")
                                    }
                                    disabled={
                                        savingKey === "localization"
                                    }
                                    className="inline-flex items-center gap-2 rounded-md bg-[#001B08] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#E8BB44] hover:text-[#001B08] disabled:opacity-50"
                                >
                                    <Save size={15} />
                                    {savingKey === "localization"
                                        ? "Saving..."
                                        : "Save Changes"}
                                </button>
                            </div>

                            <div className="mt-6 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Currency
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settings.localization.value.currency
                                        }
                                        onChange={(event) =>
                                            updateValue(
                                                "localization",
                                                "currency",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Country
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settings.localization.value.country
                                        }
                                        onChange={(event) =>
                                            updateValue(
                                                "localization",
                                                "country",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Timezone
                                    </label>

                                    <input
                                        type="text"
                                        value={
                                            settings.localization.value.timezone
                                        }
                                        onChange={(event) =>
                                            updateValue(
                                                "localization",
                                                "timezone",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-[#001B08]">
                                        Default Language
                                    </label>

                                    <select
                                        value={
                                            settings.localization.value.defaultLocale
                                        }
                                        onChange={(event) =>
                                            updateValue(
                                                "localization",
                                                "defaultLocale",
                                                event.target.value,
                                            )
                                        }
                                        className="w-full rounded-md border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-[#E8BB44]"
                                    >
                                        <option value="en">English</option>
                                        <option value="ur">Urdu</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SettingsPage;