import { c as create_ssr_component, o as onDestroy, e as escape, d as each } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let patients = [];
  onDestroy(() => {
  });
  return `${``} <div class="p-4"><button class="bg-teal-600 text-white p-2 rounded hover:bg-teal-700 flex items-center" data-svelte-h="svelte-1xyg53"><i class="fa-solid fa-sync mr-2"></i>
		Sync with PostgreSQL</button> <button class="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ease-in-out" ${""}>${escape("Load Patients")}</button> <div class="mt-4 overflow-x-auto"><table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"><thead class="bg-gray-100 border-b border-gray-200" data-svelte-h="svelte-gqvcpm"><tr><th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">ID</th> <th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Name</th> <th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Surname</th> <th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Email</th> <th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">Cellphone</th> <th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">ID Number</th> <th class="px-6 py-3 text-left text-gray-600 font-medium uppercase tracking-wider">DOB</th></tr></thead> <tbody>${each(patients, (patient) => {
    return `<tr class="hover:bg-gray-50"><td class="border-b px-6 py-4 text-gray-700">${escape(patient.id)}</td> <td class="border-b px-6 py-4 text-gray-700">${escape(patient.name)}</td> <td class="border-b px-6 py-4 text-gray-700">${escape(patient.surname)}</td> <td class="border-b px-6 py-4 text-gray-700">${escape(patient.email)}</td> <td class="border-b px-6 py-4 text-gray-700">${escape(patient.cellphone)}</td> <td class="border-b px-6 py-4 text-gray-700">${escape(patient.idNumber)}</td> <td class="border-b px-6 py-4 text-gray-700">${escape(patient.dob)}</td> </tr>`;
  })}</tbody></table></div></div>`;
});
export {
  Page as default
};
