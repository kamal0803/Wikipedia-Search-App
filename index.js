const div = document.querySelector(".container");

document.querySelector("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const query = formData.get("query");

  axios
    .get(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`
    )
    .then((res) => {
      div.innerHTML = "";

      for (let i = 0; i < res.data.query.search.length; i++) {
        const ul = document.createElement("ul");

        const li1 = document.createElement("li");
        li1.classList.add("title");

        const a1 = document.createElement("a");
        a1.href ="https://en.wikipedia.org/?curid=" + res.data.query.search[i].pageid;
        a1.target = "_blank";
        a1.textContent = res.data.query.search[i].title;
        li1.append(a1);

        ul.append(li1);

        const li2 = document.createElement("li");
        li2.classList.add("url");

        const a2 = document.createElement("a");
        a2.href = "https://en.wikipedia.org/?curid=" + res.data.query.search[i].pageid;
        a2.target = "_blank";
        a2.textContent = "https://en.wikipedia.org/?curid=" + res.data.query.search[i].pageid;
        li2.append(a2);

        ul.append(li2);

        const li3 = document.createElement("li");
        li3.classList.add("description");
        li3.innerHTML = res.data.query.search[i].snippet + "...";
        ul.append(li3);

        div.append(ul);

      }
    })
    .catch((e) => {
      console.log(e);
    });
});
