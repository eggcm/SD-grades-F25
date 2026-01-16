let data = {}
const p = document.getElementById('display-grade');


  Papa.parse("./SD-grades-F25.csv", {
// Papa.parse("test.csv", {
    download: true,
    encoding: "utf-8",
    complete: function(results) {
        let header = results.data.slice(0, 1)[0];
        let res = results.data.slice(1);

        grades = res.map(item => {
            let grade = {};
            for (i = 0; i < header.length; i++) {
                grade[header[i]] = item[i];
            }
            return grade;
        })

        for (const grade of grades) {
            data[grade[`Key`]]= grade;
        }
	}
})

function display() {
    const id = document.getElementById('sid-mid').value;
    if (id=="") return;
    // p.innerText = JSON.stringify(data[id]);
    const display = `
    SID:${data[id].學號}
    Name:${data[id].姓名}
    GroupID:${data[id].Group}
    
    Paper Presentation (30%): ${data[id].Paper}

    Project
    Proposal    (20%): ${data[id].Proposal}
    Final Demo  (15%): ${data[id].Demo}
    Final Report(25%): ${data[id].Report}
    
    ** Semester Grade (Mark): ${data[id].SEM}
    The grade SEM is determined by the following rule: (Paper Presentation)*0.3+Proposal*0.2+Demo * 0.15+ Report *0.25+10(Attendance).
    `;
    p.innerText = display;
}
