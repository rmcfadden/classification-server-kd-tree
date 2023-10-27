import { KdTreeModel } from "../src/kdTreeModel";
test("predict", async () => {
    const { predict } = KdTreeModel([]);

    const predictions = await predict("1");
    console.log("RESULT", predictions);
});
