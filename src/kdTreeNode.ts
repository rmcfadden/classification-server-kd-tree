import { NDDataPointLabel } from "classification-server/types";
export interface KDTreeNode {
    k: number;
    value: NDDataPointLabel;
    left?: KDTreeNode,
    right?: KDTreeNode,
}