/**
* Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import { Store, TemporaryData, StoreValue } from "./models/store";
import { ConfigInterface, OIDCProviderMetaData, SessionDataRaw, Stores } from "..";

export class DataLayer {
    private _id: string;
    private _store: Store;
    public constructor(instanceID: string, store: Store) {
        this._id = instanceID;
        this._store = store;
    }

    private setDataInBulk(
        key: string,
        data: ConfigInterface | OIDCProviderMetaData | SessionDataRaw | TemporaryData
    ): void {
        const existingDataJSON = this._store.getData(key) ?? null;
        const existingData = existingDataJSON && JSON.parse(existingDataJSON);

        const dataToBeSaved = { ...existingData, ...data };
        const dataToBeSavedJSON = JSON.stringify(dataToBeSaved);
        console.log(dataToBeSavedJSON);
        this._store.setData(key, dataToBeSavedJSON);
    }

    private setValue(
        key: string,
        attribute: keyof ConfigInterface | keyof OIDCProviderMetaData | keyof SessionDataRaw | keyof TemporaryData,
        value: StoreValue
    ): void {
        const existingDataJSON = this._store.getData(key) ?? null;
        const existingData = existingDataJSON && JSON.parse(existingDataJSON);

        const dataToBeSaved = { ...existingData, [attribute]: value };
        const dataToBeSavedJSON = JSON.stringify(dataToBeSaved);

        this._store.setData(key, dataToBeSavedJSON);
    }

    private removeValue(
        key: string,
        attribute: keyof ConfigInterface | keyof OIDCProviderMetaData | keyof SessionDataRaw | keyof TemporaryData
    ): void {
        const existingDataJSON = this._store.getData(key)  ?? null;
        const existingData = existingDataJSON && JSON.parse(existingDataJSON);

        const dataToBeSaved = { ...existingData };
        delete dataToBeSaved[attribute];
        const dataToBeSavedJSON = JSON.stringify(dataToBeSaved);

        this._store.setData(key, dataToBeSavedJSON);
    }

    private _resolveKey(store: Stores): string {
        return `${store}-${this._id}`;
    }

    public setConfigData(config: ConfigInterface): void {
        console.log("set config data", config);
        this.setDataInBulk(this._resolveKey(Stores.ConfigData), config);
    }

    public setOIDCProviderMetaData(oidcProviderMetaData: OIDCProviderMetaData): void {
        this.setDataInBulk(this._resolveKey(Stores.OIDCProviderMetaData), oidcProviderMetaData);
    }

    public setTemporaryData(temporaryData: TemporaryData): void {
        this.setDataInBulk(this._resolveKey(Stores.TemporaryData), temporaryData);
    }

    public setSessionData(sessionData: SessionDataRaw): void {
        this.setDataInBulk(this._resolveKey(Stores.SessionData), sessionData);
    }

    public getConfigData(): ConfigInterface {
        console.log("config data", this._store.getData(this._resolveKey(Stores.ConfigData)));
        return JSON.parse(this._store.getData(this._resolveKey(Stores.ConfigData)) ?? null);
    }

    public getOIDCProviderMetaData(): OIDCProviderMetaData {
        return JSON.parse(this._store.getData(this._resolveKey(Stores.OIDCProviderMetaData)) ?? null);
    }

    public getTemporaryData(): TemporaryData {
        return JSON.parse(this._store.getData(this._resolveKey(Stores.TemporaryData)) ?? null);
    }

    public getSessionData(): SessionDataRaw {
        return JSON.parse(this._store.getData(this._resolveKey(Stores.SessionData)) ?? null);
    }

    public removeConfigData(): void {
        this._store.removeData(this._resolveKey(Stores.ConfigData));
    }

    public removeOIDCProviderMetaData(): void {
        this._store.removeData(this._resolveKey(Stores.OIDCProviderMetaData));
    }

    public removeTemporaryData(): void {
        this._store.removeData(this._resolveKey(Stores.TemporaryData));
    }

    public removeSessionData(): void {
       this._store.removeData(this._resolveKey(Stores.SessionData));
    }

    public getConfigDataParameter(key: keyof ConfigInterface): StoreValue {
        return (
            this._store.getData(this._resolveKey(Stores.ConfigData)) &&
            JSON.parse(this._store.getData(this._resolveKey(Stores.ConfigData)) ?? null)[key]
        );
    }

    public getOIDCProviderMetaDataParameter(key: keyof OIDCProviderMetaData): StoreValue {
        return (
            this._store.getData(this._resolveKey(Stores.OIDCProviderMetaData)) &&
            JSON.parse(this._store.getData(this._resolveKey(Stores.OIDCProviderMetaData)) ?? null)[key]
        );
    }

    public getTemporaryDataParameter(key: keyof TemporaryData): StoreValue {
        return (
            this._store.getData(this._resolveKey(Stores.TemporaryData)) &&
            JSON.parse(this._store.getData(this._resolveKey(Stores.TemporaryData)) ?? null)[key]
        );
    }

    public getSessionDataParameter(key: keyof SessionDataRaw): StoreValue {
        return (
            this._store.getData(this._resolveKey(Stores.SessionData)) &&
            JSON.parse(this._store.getData(this._resolveKey(Stores.SessionData)) ?? null)[key]
        );
    }

    public setConfigDataParameter(key: keyof ConfigInterface, value: StoreValue): void {
        this.setValue(this._resolveKey(Stores.ConfigData), key, value);
    }

    public setOIDCProviderMetaDataParameter(key: keyof OIDCProviderMetaData, value: StoreValue): void {
        this.setValue(this._resolveKey(Stores.OIDCProviderMetaData), key, value);
    }

    public setTemporaryDataParameter(key: keyof TemporaryData, value: StoreValue): void {
        this.setValue(this._resolveKey(Stores.TemporaryData), key, value);
    }

    public setSessionDataParameter(key: keyof SessionDataRaw, value: StoreValue): void {
        this.setValue(this._resolveKey(Stores.SessionData), key, value);
    }

    public removeConfigDataParameter(key: keyof ConfigInterface): void {
        this.removeValue(this._resolveKey(Stores.ConfigData), key);
    }

    public removeOIDCProviderMetaDataParameter(key: keyof OIDCProviderMetaData): void {
        this.removeValue(this._resolveKey(Stores.OIDCProviderMetaData), key);
    }

    public removeTemporaryDataParameter(key: keyof TemporaryData): void {
        this.removeValue(this._resolveKey(Stores.TemporaryData), key);
    }

    public removeSessionDataParameter(key: keyof SessionDataRaw): void {
        this.removeValue(this._resolveKey(Stores.SessionData), key);
    }
}
