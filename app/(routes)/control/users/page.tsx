"use client";

import { Card } from "@/app/components/card/Card";
import { ProfilePreview } from "@/app/components/profile-preview/ProfilePreview";
import { formatDate, formatNumber } from "@/app/utils/formatters";
import { GET } from "@/app/utils/http-client";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function UsersControlPage() {
  const [searchResults, setSearchResults] = useState<any>(null);
  const [formData, setFormData] = useState({ username: "", email: "" });
  const [pageNumber, setPageNumber] = useState(1);
  const [isLastPage, setIsLastPage] = useState(true);

  const fetchUsers = async () => {
    const response = await GET(
      `/users?username=${formData.username}&email=${formData.email}&pageNumber=${pageNumber}`
    );
    const users = await response.json();

    setSearchResults(users);
  };

  useEffect(() => {
    const fetchInit = async () => {
      const response = await GET(
        `/users?username=${formData.username}&email=${formData.email}&pageNumber=${pageNumber}`
      );
      const paginatedResults = await response.json();

      setSearchResults(paginatedResults);
      setPageNumber(paginatedResults.page_number);
    };

    if (!searchResults) {
      fetchInit();
    }
  }, [searchResults, formData, pageNumber]);

  useEffect(() => {
    if (searchResults) {
      const { page_number, items_per_page, total_items } = searchResults;
      setIsLastPage(page_number * items_per_page >= total_items);
    }
  }, [searchResults]);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function submitSearch(event: any): void {
    event.preventDefault();
    fetchUsers();
  }

  if (!searchResults) {
    return (
      <Card type="outlined" className="flex flex-col gap-4">
        <section>
          <h1>Search Users</h1>
          Loading...
        </section>
      </Card>
    );
  }

  return (
    <Card type="outlined" className="flex flex-col gap-4">
      <section className="flex flex-col gap-4">
        <h1>Search Users</h1>
        <form className="flex flex-col gap-2 w-full" onSubmit={submitSearch}>
          <div className="flex flex-col md:flex-row gap-2 items-center">
            <div className="form-field">
              <input name="username" onChange={handleChange} type="text" placeholder="Username" />
            </div>
            <div className="form-field">
              <input
                name="email"
                onChange={handleChange}
                type="text"
                inputMode="email"
                placeholder="E-mail"
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-2">
            <input className="common ghost" type="reset" value="Reset" />
            <input className="common filled" type="submit" value="Search" />
          </div>
        </form>
      </section>
      <hr />
      <section className="flex flex-col">
        <h1>Results ({formatNumber(searchResults.total_items)})</h1>
        {searchResults.items.map((user: any) => {
          return (
            <div className="flex border-b first:border-t py-2" key={user.id}>
              <div className="flex gap-3 items-center">
                <ProfilePreview className="w-8 h-8" user={user} />
                <div className="text-sm">
                  <div className="flex gap-1 items-center">
                    <div className="capitalize">
                      {user.first_name} {user.last_name}
                    </div>
                    <div className="text-gray-600 text-xs">(@{user.username})</div>
                  </div>
                  <div className="text-xs">
                    <Link href={`mailto:${user.email}`}>{user.email}</Link>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(user.created_at, {
                      month: "short",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>
      <div className="flex items-center justify-between">
        <button disabled={pageNumber === 1} className="common outlined">
          Previous
        </button>
        <button disabled={isLastPage} className="common outlined">
          Next
        </button>
      </div>
    </Card>
  );
}
