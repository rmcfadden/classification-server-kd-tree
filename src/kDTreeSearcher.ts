import { NDDataPoint } from "classification-server/types";
import { KDTreeNode } from "./kDTreeNode";

export const KDTreeSearcher = () => {
    const search = (tree: KDTreeNode, dataPoint: NDDataPoint) => {
        if (!tree) return undefined;


    }

    return { search };
}