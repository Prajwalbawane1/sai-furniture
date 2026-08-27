"use client";

import React, { useState, useEffect } from "react";
import { Enquiry, EnquiryStatus } from "@/types";
import { 
  Inbox, 
  MessageCircle, 
  Phone, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  ExternalLink 
} from "lucide-react";

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<"all" | EnquiryStatus>("all");
  const [search, setSearch] = useState("");

  const fetchEnquiries = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/enquiries");
      const data = await res.json();
      setEnquiries(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load enquiries:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this customer enquiry record?")) return;

    try {
      const res = await fetch(`/api/admin/enquiries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEnquiries((prev) => prev.filter((e) => e.id !== id));
      }
    } catch (err) {
      alert("Failed to delete enquiry");
    }
  };

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesFilter =
      filterStatus === "all" || e.status === filterStatus;
    const matchesSearch =
      search === "" ||
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.phone.includes(search) ||
      e.message.toLowerCase().includes(search.toLowerCase()) ||
      (e.product_name && e.product_name.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  const countByStatus = {
    all: enquiries.length,
    new: enquiries.filter((e) => e.status === "new").length,
    contacted: enquiries.filter((e) => e.status === "contacted").length,
    completed: enquiries.filter((e) => e.status === "completed").length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-charcoal-800">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Customer Enquiries Inbox ({enquiries.length})
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Review incoming quote requests and respond immediately through WhatsApp.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Status Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setFilterStatus("all")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === "all"
                ? "bg-brand-700 text-white shadow"
                : "bg-charcoal-950 text-charcoal-300 border border-charcoal-800 hover:bg-charcoal-900"
            }`}
          >
            All ({countByStatus.all})
          </button>
          <button
            onClick={() => setFilterStatus("new")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              filterStatus === "new"
                ? "bg-emerald-700 text-white shadow"
                : "bg-charcoal-950 text-emerald-400 border border-charcoal-800 hover:bg-charcoal-900"
            }`}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>New Leads ({countByStatus.new})</span>
          </button>
          <button
            onClick={() => setFilterStatus("contacted")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === "contacted"
                ? "bg-amber-700 text-white shadow"
                : "bg-charcoal-950 text-amber-300 border border-charcoal-800 hover:bg-charcoal-900"
            }`}
          >
            Contacted ({countByStatus.contacted})
          </button>
          <button
            onClick={() => setFilterStatus("completed")}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              filterStatus === "completed"
                ? "bg-blue-700 text-white shadow"
                : "bg-charcoal-950 text-blue-300 border border-charcoal-800 hover:bg-charcoal-900"
            }`}
          >
            Completed ({countByStatus.completed})
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-charcoal-400" />
          <input
            type="text"
            placeholder="Search by customer name, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-950 text-xs text-white placeholder:text-charcoal-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Enquiries Feed */}
      {isLoading ? (
        <div className="p-12 text-center text-charcoal-400 space-y-3">
          <div className="h-6 w-6 rounded-full border-2 border-brand-500 border-t-transparent animate-spin mx-auto" />
          <p className="text-xs">Loading enquiries...</p>
        </div>
      ) : filteredEnquiries.length === 0 ? (
        <div className="rounded-3xl bg-charcoal-950 p-12 text-center text-charcoal-400 space-y-3 border border-charcoal-800">
          <Inbox className="h-10 w-10 mx-auto text-charcoal-600" />
          <p className="text-sm">No enquiries found under this filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEnquiries.map((enq) => {
            const customerWhatsAppUrl = `https://wa.me/91${enq.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              `Hello ${enq.name}, thank you for contacting Sai Furniture (Navegaon, Gadchiroli) regarding "${enq.product_name || "your furniture enquiry"}". How can we help you?`
            )}`;

            const formattedDate = new Date(enq.created_at).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            });

            return (
              <div
                key={enq.id}
                className="rounded-3xl bg-charcoal-950 p-6 border border-charcoal-800 shadow-sm space-y-4 hover:border-charcoal-700 transition-colors"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-charcoal-800/80">
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-base sm:text-lg font-bold text-white">
                      {enq.name}
                    </h3>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleUpdateStatus(enq.id, e.target.value as EnquiryStatus)
                      }
                      className={`text-xs px-2.5 py-1 rounded-full font-bold uppercase tracking-wider focus:outline-none cursor-pointer border ${
                        enq.status === "new"
                          ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                          : enq.status === "contacted"
                          ? "bg-amber-950 text-amber-300 border-amber-800"
                          : "bg-charcoal-900 text-charcoal-300 border-charcoal-700"
                      }`}
                    >
                      <option value="new">New Lead</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-charcoal-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-400" />
                      <span>{formattedDate}</span>
                    </span>
                    <button
                      onClick={() => handleDelete(enq.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:bg-red-950/40"
                      title="Delete Record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Contact Badges */}
                <div className="flex flex-wrap gap-4 text-xs">
                  <a
                    href={`tel:${enq.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1.5 text-sand-200 hover:text-white bg-charcoal-900 px-3 py-1.5 rounded-xl border border-charcoal-800"
                  >
                    <Phone className="h-3.5 w-3.5 text-brand-400" />
                    <span>Phone: {enq.phone}</span>
                  </a>

                  {enq.email && (
                    <a
                      href={`mailto:${enq.email}`}
                      className="flex items-center gap-1.5 text-sand-200 hover:text-white bg-charcoal-900 px-3 py-1.5 rounded-xl border border-charcoal-800"
                    >
                      <Mail className="h-3.5 w-3.5 text-brand-400" />
                      <span>Email: {enq.email}</span>
                    </a>
                  )}

                  {enq.product_name && (
                    <div className="flex items-center gap-1.5 text-amber-300 bg-brand-950/60 px-3 py-1.5 rounded-xl border border-brand-800/60 font-medium">
                      <span>Product Interest:</span>
                      <span className="font-bold">{enq.product_name}</span>
                    </div>
                  )}
                </div>

                {/* Message Box */}
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800/80 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-charcoal-400 tracking-wider">
                    Customer Message:
                  </span>
                  <p className="text-sm text-sand-100 leading-relaxed">
                    {enq.message}
                  </p>
                </div>

                {/* Quick Action Bar */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <a
                    href={customerWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow transition-all"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>Reply to {enq.name} on WhatsApp</span>
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </a>

                  {enq.status === "new" && (
                    <button
                      onClick={() => handleUpdateStatus(enq.id, "contacted")}
                      className="text-xs font-semibold text-charcoal-400 hover:text-sand-200"
                    >
                      Mark as Contacted
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
