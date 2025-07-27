"use client";
import { useEffect, useState } from "react";
import { Trash2, Search, Filter, Calendar, User, Briefcase, Download, RefreshCw, ChevronDown, X } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, searchTerm, dateFilter, statusFilter]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/feedbacks");
      const data = await res.json();
      setFeedbacks(data.feedbacks || []);
    } catch (err) {
      console.error("Failed to fetch feedbacks:", err);
      toast.error("❌ Failed to load feedbacks");
    } finally {
      setLoading(false);
    }
  };

  const filterFeedbacks = () => {
    let filtered = [...feedbacks];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.hrDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.yourDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.directNaukriJob?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Date filter
    if (dateFilter !== "all") {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case "today":
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(item => new Date(item.createdAt) >= filterDate);
          break;
        case "week":
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(item => new Date(item.createdAt) >= filterDate);
          break;
        case "month":
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(item => new Date(item.createdAt) >= filterDate);
          break;
      }
    }

    // Status filter (assuming we have a status field)
    if (statusFilter !== "all") {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    setFilteredFeedbacks(filtered);
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/feedbacks/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setFeedbacks(prev => prev.filter(f => f._id !== id));
        setSelectedItems(prev => prev.filter(item => item !== id));
        toast.success("✅ Feedback deleted successfully");
      } else {
        toast.error("❌ Failed to delete feedback");
      }
    } catch (err) {
      toast.error("❌ Error deleting feedback");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    
    const confirmDelete = confirm(`Are you sure you want to delete ${selectedItems.length} selected items?`);
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const deletePromises = selectedItems.map(id => 
        fetch(`/api/feedbacks/${id}`, { method: "DELETE" })
      );
      
      await Promise.all(deletePromises);
      setFeedbacks(prev => prev.filter(f => !selectedItems.includes(f._id)));
      setSelectedItems([]);
      toast.success(`✅ ${selectedItems.length} feedbacks deleted successfully`);
    } catch (err) {
      toast.error("❌ Error deleting feedbacks");
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredFeedbacks.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredFeedbacks.map(item => item._id));
    }
  };

  const exportData = () => {
    const csvContent = [
      ["HR Details", "Candidate Details", "DirectNaukri Job", "Date"],
      ...filteredFeedbacks.map(item => [
        item.hrDetails || "",
        item.yourDetails || "",
        item.directNaukriJob || "",
        new Date(item.createdAt).toLocaleString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `feedbacks_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("📊 Data exported successfully");
  };

  const clearFilters = () => {
    setSearchTerm("");
    setDateFilter("all");
    setStatusFilter("all");
    setShowFilters(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading feedbacks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                User Feedbacks Dashboard
              </h1>
              <p className="text-gray-600">
                Manage and analyze user feedback submissions
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium"
              >
                <Download size={16} />
                Export CSV
              </button>
              <button
                onClick={fetchFeedbacks}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors font-medium"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-blue-600">{feedbacks.length}</div>
              <div className="text-sm text-blue-700">Total Feedbacks</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-green-600">{filteredFeedbacks.length}</div>
              <div className="text-sm text-green-700">Filtered Results</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-yellow-600">{selectedItems.length}</div>
              <div className="text-sm text-yellow-700">Selected Items</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl">
              <div className="text-2xl font-bold text-purple-600">
                {feedbacks.filter(f => {
                  const today = new Date();
                  const itemDate = new Date(f.createdAt);
                  return itemDate.toDateString() === today.toDateString();
                }).length}
              </div>
              <div className="text-sm text-purple-700">Today's Submissions</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by HR details, candidate name, or job title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Filter size={16} />
              Filters
              <ChevronDown className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} size={16} />
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">Last 7 Days</option>
                    <option value="month">Last 30 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="processed">Processed</option>
                    <option value="contacted">Contacted</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <X size={16} />
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                {selectedItems.length} item(s) selected
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleBulkDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl transition-colors font-medium"
                >
                  <Trash2 size={16} />
                  {isDeleting ? "Deleting..." : "Delete Selected"}
                </button>
                <button
                  onClick={() => setSelectedItems([])}
                  className="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Feedback List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredFeedbacks.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No feedbacks found</h3>
              <p className="text-gray-600">
                {searchTerm || dateFilter !== "all" || statusFilter !== "all" 
                  ? "Try adjusting your filters to see more results."
                  : "No feedback submissions yet. Check back later."}
              </p>
            </div>
          ) : (
            <>
              {/* Table Header */}
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === filteredFeedbacks.length && filteredFeedbacks.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div className="text-sm font-medium text-gray-700">
                    Select All ({filteredFeedbacks.length})
                  </div>
                </div>
              </div>

              {/* Feedback Items */}
              <div className="divide-y divide-gray-100">
                {filteredFeedbacks.map((item) => (
                  <div
                    key={item._id}
                    className={`p-6 hover:bg-gray-50 transition-colors ${
                      selectedItems.includes(item._id) ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems(prev => [...prev, item._id]);
                          } else {
                            setSelectedItems(prev => prev.filter(id => id !== item._id));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 mt-1"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">HR Details</span>
                            </div>
                            <p className="text-gray-900 break-words">{item.hrDetails || "Not provided"}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">Candidate</span>
                            </div>
                            <p className="text-gray-900 break-words">{item.yourDetails || "Not provided"}</p>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Briefcase className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-700">DirectNaukri Job</span>
                            </div>
                            <p className="text-gray-900 break-words">{item.directNaukriJob || "Not specified"}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Submitted on: {new Date(item.createdAt).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {item.status || "Pending"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={isDeleting}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete feedback"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}