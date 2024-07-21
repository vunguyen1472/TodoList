import React, { ReactElement } from "react";
import { RootStore } from "../stores/root-store";

const rootStore = new RootStore();

type ProviderProps = {
    children: ReactElement;
}

export const RootStoreContext: React.Context<RootStore> = React.createContext<RootStore>({} as RootStore);

export const RootStoreProvider: React.Provider<RootStore> = RootStoreContext.Provider;

export const useStores = () => React.useContext(RootStoreContext);