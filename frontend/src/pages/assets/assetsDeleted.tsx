import { Typography } from "@mui/material";
import { AssetsDeletedCard } from "components/atoms/Cards/Assets";
import { CallGetAssetsDeleted } from "components/wallet/contractCall";
import PageLoged from "pages/pageCheckLogin";
import { useEffect, useState } from "react";
import { AssetsInList } from "types";

const AssetsDeletedPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [assets, setAssets] = useState<AssetsInList[]>();


    useEffect(()=> {
        const id = window.localStorage.getItem('orgId');

        CallGetAssetsDeleted(Number(id)).then((response) => {
            console.log(response)
            const len = response.length;
            console.log(len);
            const container: AssetsInList[] = [];

            for (let i = 0; i < len; i++) {
                const asset: AssetsInList = {
                    name: response[0].name,
                    assetType: response[0].assetType,
                    creationDate: Number(response[0].creationDate),
                    adquireDate: Number(response[0].adquireDate),
                    originalId: Number(response[0].originalAssetId),
                    index: Number(response[0].index)
                  }
                console.log(asset);
                container.push(asset);
            }
            console.log("container");
            console.log(container);
            setAssets(container);
            setIsLoading(false);
        
        })
    }, [])
    




    return (
        <PageLoged>
            {!isLoading && assets && <>
            <Typography variant="h5">Activos Eliminados</Typography>
            <AssetsDeletedCard assets={assets}/>
            </>}
        </PageLoged>
    )
}

export default AssetsDeletedPage;