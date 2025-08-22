import asyncio


# fake async labeling function
async def label_node(name):
    print(f"Start labeling {name}")
    await asyncio.sleep(1)  # pretend it's slow
    print(f"Done labeling {name}")
    return f"Label({name})"


# tree structure
tree = {
    "Root": ["ChildA", "ChildB"],
    "ChildA": ["A1", "A2"],
    "ChildB": ["B1", "B2"],
    "A1": [],
    "A2": [],
    "B1": [],
    "B2": [],
}


async def process_node(name):
    # label this node
    label = asyncio.create_task(label_node(name))
    # immediately spawn tasks for children
    tasks = [asyncio.create_task(process_node(child)) for child in tree[name]]

    # return this node's label + wait for children
    children_labels = await asyncio.gather(*tasks) if tasks else []
    return {name: {"label": await label, "children": children_labels}}


async def main():
    result = await process_node("Root")
    print("Final tree:", result)


asyncio.run(main())


a = {
    "Root": {
        "label": "Label(Root)",
        "children": [
            {
                "ChildA": {
                    "label": "Label(ChildA)",
                    "children": [
                        {"A1": {"label": "Label(A1)", "children": []}},
                        {"A2": {"label": "Label(A2)", "children": []}},
                    ],
                }
            },
            {
                "ChildB": {
                    "label": "Label(ChildB)",
                    "children": [
                        {"B1": {"label": "Label(B1)", "children": []}},
                        {"B2": {"label": "Label(B2)", "children": []}},
                    ],
                }
            },
        ],
    }
}
