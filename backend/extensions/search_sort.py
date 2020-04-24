from functools import reduce
from flask import request
from sqlalchemy import or_
from util.sql import escape_like
import pgeocode


def searchable_query(*str_params):
    """
    We want a decorator that can accept arguments. To achieve this, we have a
    function that takes arguments and returns a decorator with the arguments
    captured
    """

    def searchable_query_internal(class_query):
        """
        The actual decorator. Takes the original query classmethod and adds
        searching functionality.
        """

        def search_query(cls):
            """
            The new function that the decorator returns
            """
            query = class_query(cls)

            search = request.args.get("search")
            if search:
                search = escape_like(search.strip())
                q_or = reduce(
                    or_,
                    (
                        p.ilike("%" + w + "%", escape="\\")
                        for w in search.split()
                        for p in str_params
                    ),
                )

                return query.filter(q_or)

            return query

        return search_query

    return searchable_query_internal


def request_has_sort():
    """
    Check if the current request has sorting query parameters
    """
    return "sort" in request.args and "dir" in request.args


def request_max_dist():
    """
    Get the max dist from the request if provided. Else, return None.
    """
    return request.args.get("max_dist")


def request_user_loc():
    """
    Get the user_loc from the zip_code query parameter for the current request.
    Otherwise, return the GDC location.
    """
    if "zip_code" in request.args:
        nomi = pgeocode.Nominatim("us")
        user_loc = nomi.query_postal_code(request.args.get("zip_code"))
        user_loc = (user_loc["latitude"], user_loc["longitude"])
    else:
        user_loc = (30.286, -97.736)  # GDC
    return user_loc


def should_default_sort():
    """
    Check if we are already sorting by some other means. We can use this
    function to detect if we should provide a default ordering. 
    """
    return not request_has_sort() and (
        "q" not in request.args or "order_by" not in request.args.get("q")
    )


def sorted_by_relationship(field_name, *sortables):
    def sorted_by_field_internal(class_query):
        def result(cls):
            query = class_query(cls)
            if not request_has_sort():
                return query

            sort = request.args.get("sort")
            dir = request.args.get("dir")

            for sortable in sortables:
                if hasattr(cls, sortable) and sort == sortable:
                    relationship = getattr(cls, sortable)
                    class_ = relationship.property.mapper.class_
                    if not hasattr(class_, field_name):
                        continue  # ignore relationships without the given field
                    field = getattr(class_, field_name)
                    order = field if dir == "asc" else field.desc()
                    return query.join(relationship).order_by(order)
            # We don't know the input, just don't sort
            return query

        return result

    return sorted_by_field_internal


def sorted_by_cases(names, cases):
    def sorted_by_cases_internal(class_query):
        def result(cls):
            query = class_query(cls)
            if not request_has_sort():
                return query

            sort = request.args.get("sort")
            dir = request.args.get("dir")

            for name in names:
                if hasattr(cls, name) and sort == name:
                    field = getattr(class_, name)
                    order = case(
                        [(field == c, str(i)) for i, c in enumerate(cases)],
                        else_=str(len(cases)),
                    )
                    if dir != "asc":
                        order = order.desc()
                    return query.join(relationship).order_by(order)
            # We don't know the input, just don't sort
            return query

        return result

    return sorted_by_cases_internal
