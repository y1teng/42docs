stdarg(3)              Library Functions Manual              stdarg(3)

NAME
       stdarg,  va_start,  va_arg, va_end, va_copy - variable argument
       lists

LIBRARY
       Standard C library (libc, -lc)

SYNOPSIS
       #include <stdarg.h>

       void va_start(va_list ap, last);
       type va_arg(va_list ap, type);
       void va_end(va_list ap);
       void va_copy(va_list dest, va_list src);

DESCRIPTION
       A function may be called with a varying number of arguments  of
       varying  types.   The  include  file <stdarg.h> declares a type
       va_list and defines three macros for stepping through a list of
       arguments whose number and types are not known  to  the  called
       function.

       The  called  function  must  declare  an object of type va_list
       which is used by the macros va_start(), va_arg(), and va_end().

