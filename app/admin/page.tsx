import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import AdminClient from "./AdminClient";

import getListings, {
    IListingsParams
  } from "@/app/actions/getListings";

interface HomeProps {
    searchParams: IListingsParams
  };

const PropertiesPage = async ({searchParams} : HomeProps) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );
    }

    const listings = await getListings(searchParams);

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properties to administrate found"
                    subtitle="Looks like nobody has added a property yet."
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <AdminClient
                currentUser={currentUser}
                listings={listings}
            />

        </ClientOnly>
    );

}


export default PropertiesPage;