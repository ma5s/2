import { apiClient } from "./service/api.js";

// получение контактов без сделок
const getContacts = async (limit, page) => {
  try {
    const response = await apiClient.get(`/contacts`, {
      params: {
        limit: limit,
        with: "leads",
        page: page,
      },
    });

    // сортируем контакты у кого нет сделок
    var sortedContactsWitthoutLeads = [];
    for (const contact of response.data._embedded.contacts) {
      if (contact._embedded.leads.length === 0) {
        sortedContactsWitthoutLeads.push(contact);
      }
    }

    return sortedContactsWitthoutLeads;
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    throw error; // Пробрасываем ошибку, чтобы обработать её на уровне вызова
  }
};

// создание задач для контактов без сделок
const createTaskForContact = async (contacts) => {
  var tasks = [];
  for (const contact of contacts) {
    let unixTimestamp = Math.floor((Date.now() +( 24 * 60 * 60 * 1000)) / 1000)

    let task = {
      text: "Контакт без сделок",
      complete_till: unixTimestamp,
      entity_id: contact.id,
      entity_type: "contacts",
      request_id: "example",
    };

    tasks.push(task);
    console.log(
      `создание задачи для : id: ${contact.id}; name: ${contact.name}`
    );
  }

  try {
    const response = await apiClient.post("/tasks", JSON.stringify(tasks));

    if (!response.data._embedded?.tasks?.length) {
        console.error("Не удалось создать задачи");
    } else {
        console.log(`задачи созданы, id задач: ${response.data._embedded.tasks}`)
    }

  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    throw error; // Пробрасываем ошибку, чтобы обработать её на уровне вызова
  }
};

const start = async () => {
  // параметры limit, page
  const contacts = await getContacts(25, 1);
  // создание задач
  createTaskForContact(contacts);
};

start();
