  
   <ul><li id="parent" ></li></ul>
<input id="child" />
<script>
$("#parent").kendoDropDownList({
    dataTextField: "parentName",
    dataValueField: "parentId",
    dataSource: [
        { parentName: "Parent1", parentId: 1 },
        { parentName: "Parent2", parentId: 2 }
    ]
});

$("#child").kendoDropDownList({
    cascadeFrom: "parent",
    dataTextField: "childName",
    dataValueField: "childId",
    dataSource: [
        { childName: "Child1", childId: 1, parentId: 1 },
        { childName: "Child2", childId: 2, parentId: 2 },
        { childName: "Child3", childId: 3, parentId: 1 },
        { childName: "Child4", childId: 4, parentId: 2 }
    ]
});
</script>