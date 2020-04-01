def escape(string, char, esc="\\"):
    """ escape a character in a string with a given escape sequence """
    return string.replace(char, esc + char)


def escape_like(pattern, esc="\\"):
    """
    escape an SQL LIKE pattern.
    Sensitive chars are:
        "%": zero-or-more wildcard
        "_": single character wildcard
    """
    pattern = escape(pattern, esc, esc=esc)  # escape the escape character
    pattern = escape(pattern, "%", esc=esc)
    pattern = escape(pattern, "_", esc=esc)
    return pattern
