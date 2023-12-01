import { NDDataPoint } from "classification-server/types";
import { KDTreeNode } from "./kDTreeNode";

export const KDTreeSearcher = () => {
    const distance = (node: KDTreeNode | undefined, dataPoint: NDDataPoint) => {
        if (node === undefined) return Number.MAX_VALUE;
        const {
            value: { values: nodeValues },
        } = node;
        const { values: pointValues } = dataPoint;
        return Math.hypot(...nodeValues.map((tv, i) => tv - pointValues[i]));
    };

    const search = (
        node: KDTreeNode | undefined,
        dataPoint: NDDataPoint
    ): KDTreeNode | undefined => {
        if (!node) return undefined;
        const nodeDistance = distance(node, dataPoint);

        console.log("node", node);
        console.log("nodeDistance", nodeDistance);

        if (nodeDistance === 0) return node;
        const { left, right } = node;
        const leftNodeDistance = left ? distance(left, dataPoint) : Number.MAX_VALUE;
        const rightNodeDistance = right ? distance(right, dataPoint) : Number.MAX_VALUE;
        const isLeftCloser =
            Math.abs(leftNodeDistance - nodeDistance) < Math.abs(rightNodeDistance - nodeDistance);
        const bestChildNode = isLeftCloser ? left : right;
        const bestNode =
            distance(node, dataPoint) < distance(bestChildNode, dataPoint) ? node : bestChildNode;
        const childBest = isLeftCloser ? search(left, dataPoint) : search(right, dataPoint);

        console.log("bestNode", bestNode);
        console.log("childBest", childBest);
        console.log("bestNode", distance(bestNode, dataPoint));
        console.log("childBest", distance(childBest, dataPoint));

        return distance(childBest, dataPoint) < distance(bestNode, dataPoint)
            ? childBest
            : bestNode;
    };

    return { search };
};
