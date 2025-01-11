import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { CiSearch } from "react-icons/ci";
import deleteIcon from "../../assets/deleteicons.svg";
import EditIcon from "../../assets/Editicon.svg";
import SaveIcon from "../../assets/Filled.svg";
import FilterIcon from "../../assets/filter.svg";
import "../../styles/Template.scss";
import data from "../../Data/TemplateData";

import PropTypes from "prop-types";

export const useTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = () => {
    setIsLoading(true);
    // Simulated API call
    setTimeout(() => {
      const fetchedTemplates = data
      setTemplates(fetchedTemplates);
      setIsLoading(false);
    }, 1000);
  };

  const addTemplate = () => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const newTemplate = {
      id: templates.length + 1,
      title: `New Template ${templates.length + 1}`,
      templateId: `T-00${templates.length + 1}`,
      message: "New message content",
      createdDate: `${formattedDate} ${formattedTime}`,
      updateDate: `${formattedDate} ${formattedTime}`,
      count: 0,
    };
    setTemplates([...templates, newTemplate]);
  };

  const deleteTemplate = (id) => {
    setTemplates(templates.filter((template) => template.id !== id));
  };

  const editTemplate = (id) => {
    const templateToEdit = templates.find((template) => template.id === id);
    if (templateToEdit) {
      console.log("Editing template:", templateToEdit);
    }
  };

  return {
    templates,
    isLoading,
    addTemplate,
    deleteTemplate, 
    editTemplate, 
  };
};

export const useTableColumns = (onDelete, onEdit) => {
  return [
    {
      name: "Title",
      selector: "title",
      cell: (row) => <div>{row.title}</div>,
    },
    {
      name: "Template Id",
      selector: "templateId",
      cell: (row) => <div>{row.templateId}</div>,
    },
    {
      name: "Message",
      selector: "message",
      cell: (row) => <div>{row.message}</div>,
    },
    {
      name: "Created Date & Time",
      selector: "createdDate",
      cell: (row) => <div>{row.createdDate}</div>,
      width: "180px",
    },
    {
      name: "Update Date & Time",
      selector: "updateDate",
      cell: (row) => <div>{row.updateDate}</div>,
      width: "180px",
    },
    {
      name: "Count",
      selector: "count",
      cell: (row) => <div className="text-center">{row.count}</div>,
      width: "80px",
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <ActionButtons row={row} onDelete={onDelete} onEdit={onEdit} />
      ),
      width: "180px",
    },
  ];
};

// Components with PropTypes
const ActionButtons = ({ row, onDelete, onEdit }) => (
  <div className="action-cell">
    <button
      onClick={(e) => {
        e.preventDefault();
        onDelete(row.id);
      }}
      className="action-button"
      aria-label="Delete Template"
    >
      <img src={deleteIcon} alt="DeleteIcon" />
    </button>
    <button
      onClick={(e) => {
        e.preventDefault();
        onEdit(row.id);
      }}
      className="action-button"
      aria-label="Edit Template"
    >
      <img src={EditIcon} alt="Edit Icon" />
    </button>
  </div>
);

ActionButtons.propTypes = {
  row: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const Header = ({ onAddTemplate }) => (
  <div className="template-header">
    <div className="template-header__title">
      <h2>Template</h2>
    </div>
    <div>
      <button
        onClick={onAddTemplate}
        type="button"
        className="template-header__add-button"
      >
        Add Template
      </button>
    </div>
  </div>
);

Header.propTypes = {
  onAddTemplate: PropTypes.func.isRequired,
};

const SearchForm = ({ onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="search-input-group">
      <input type="text" placeholder="Search" />
      <CiSearch className="text-white font-bold" />
    </div>
  </form>
);

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

const TableHeader = ({ onSearchSubmit }) => (
  <div className="table-header">
    <div className="table-header__title">View Template List</div>
    <div className="table-header__actions">
      <div className="filter-button">
        <button type="button">
          <img src={FilterIcon} alt="Filter Icon" />
        </button>
      </div>

      <div className="search-container">
        <SearchForm onSubmit={onSearchSubmit} />
      </div>

      <div className="save-search">
        <img src={SaveIcon} alt="Save" />
        <span>Save Search</span>
      </div>
    </div>
  </div>
);

TableHeader.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};

// Main Template Component
const Template = () => {
  const { templates, isLoading, addTemplate, deleteTemplate, editTemplate } =
    useTemplates();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Search query submitted");
  };

  const columns = useTableColumns(deleteTemplate, editTemplate);

  const handleAddTemplate = (event) => {
    event.preventDefault();
    addTemplate();
  };

  return (
    <div className="template-container">
      <div className="template-container__inner">
        <Header onAddTemplate={handleAddTemplate} />

        <div className="template-content">
          <div className="template-content__container">
            <TableHeader onSearchSubmit={handleSearchSubmit} />

            <div className="table-container">
              <div className="table-container__inner">
                <div className="table-container__content">
                  <div className="table-scroll">
                    <DataTable
                      columns={columns}
                      data={templates}
                      progressPending={isLoading}
                      progressComponent="Loading templates..."
                      pagination
                      highlightOnHover
                      pointerOnHover
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Template;
