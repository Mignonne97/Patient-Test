import { c as create_ssr_component, d as each, f as add_attribute, e as escape } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let patients = [];
  let page = 1;
  let totalPages = 1;
  function getVisiblePages() {
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, page - halfVisible);
    let endPage = Math.min(totalPages, page + halfVisible);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    return { startPage, endPage };
  }
  return `<div class="p-4"><button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out" data-svelte-h="svelte-1vtl2pq">Load Patients</button></div>  <div class="flex justify-center mt-4"><button class="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400 transition" ${"disabled"}>Previous</button> ${each(Array(getVisiblePages().endPage - getVisiblePages().startPage + 1), (_, i) => {
    return `${page > getVisiblePages().startPage - 1 && page <= getVisiblePages().endPage ? `<button${add_attribute(
      "class",
      `px-4 py-2 rounded ${page === getVisiblePages().startPage + i ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} hover:bg-gray-300 transition`,
      0
    )}>${escape(getVisiblePages().startPage + i)} </button>` : ``}`;
  })} <button class="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2 hover:bg-gray-400 transition" ${"disabled"}>Next</button></div>  ${``}  <table class="table-auto w-full mt-4 border-collapse border border-gray-300"><thead data-svelte-h="svelte-1rf3j0b"><tr><th class="px-4 py-2 border-b">ID</th> <th class="px-4 py-2 border-b">Name</th> <th class="px-4 py-2 border-b">Surname</th> <th class="px-4 py-2 border-b">Email</th> <th class="px-4 py-2 border-b">Cellphone</th> <th class="px-4 py-2 border-b">ID Number</th> <th class="px-4 py-2 border-b">DOB</th></tr></thead> <tbody>${each(patients, (patient) => {
    return `<tr><td class="border px-4 py-2">${escape(patient.id)}</td> <td class="border px-4 py-2">${escape(patient.name)}</td> <td class="border px-4 py-2">${escape(patient.surname)}</td> <td class="border px-4 py-2">${escape(patient.email)}</td> <td class="border px-4 py-2">${escape(patient.cellphone)}</td> <td class="border px-4 py-2">${escape(patient.idNumber)}</td> <td class="border px-4 py-2">${escape(patient.dob)}</td> </tr>`;
  })}</tbody></table>`;
});
export {
  Page as default
};
