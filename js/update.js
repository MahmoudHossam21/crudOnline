const baseURL = "https://crudonline-7z4f.onrender.com";

const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  'authorization': `Bearer ${localStorage.getItem("token")}`,
};

const noteID = localStorage.getItem("noteID");

function getNote() {
  axios({
    method: "get",
    url: `${baseURL}/note/${noteID}`,
    headers,
  })
    .then(function (response) {
      const { message, note } = response.data;
      console.log(response);
      if (message == "Done") {
        $("#productName").val(note.productName);
        $("#ProductCategory").val(note.ProductCategory);
        $("#ProductDesc").val(note.ProductDesc);
        $("#productPrice").val(note.productPrice);
      } else {
        // alert("Fail")
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

getNote();

$("#updateNote").click(() => {
  const data = {
    productName: $("#productName").val(),
    ProductCategory: $("#ProductCategory").val(),
    ProductDesc: $("#ProductDesc").val(),
    productPrice: $("#productPrice").val(),
  };
  axios({
    method: "put",
    url: `${baseURL}/note/${noteID}`,
    data,
    headers,
  })
    .then((response) => {
      const { message } = response.data;
      console.log({ rr: response.data });
      if (message == "Done") {
        window.location.href = "crud.html";
      } else {
        alert("In-valid data");
      }
    })
    .catch((err) => {
      console.log({ message: "Catch error", err });
    });
});
