import { CATEGORIES } from "../pages/ExpenseTracker";
import "./Filters.css";

function Filters({
    filterType,
    filterCategory,
    searchTerm,
    onFilterTypeChange,
    onFilterCategoryChange,
    onSearchChange,
}) {
    return (
        <div className="filters-container">

            <div className="filters-header">
                <div>
                    <span className="filters-badge">FILTERS</span>
                    <h2>Find Transactions</h2>
                    <p>Filter or search through your transactions.</p>
                </div>

                <div className="filter-icon">
                    ☰
                </div>
            </div>

            <div className="filters-content">

                <div className="filter-group">
                    <label>Type</label>

                    <select
                        value={filterType}
                        onChange={(e) =>
                            onFilterTypeChange(e.target.value)
                        }
                    >
                        <option value="all">All Types</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Category</label>

                    <select
                        value={filterCategory}
                        onChange={(e) =>
                            onFilterCategoryChange(e.target.value)
                        }
                    >
                        <option value="all">All Categories</option>

                        {CATEGORIES.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}

                    </select>
                </div>

                <div className="filter-group search-group">
                    <label>Search</label>

                    <div className="search-input">
                        <span className="search-icon">⌕</span>

                        <input
                            type="text"
                            placeholder="Search by title..."
                            value={searchTerm}
                            onChange={(e) =>
                                onSearchChange(e.target.value)
                            }
                        />
                    </div>
                </div>

            </div>

        </div>
    );
}

export default Filters;