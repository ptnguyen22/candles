--
-- PostgreSQL database dump
--

-- Dumped from database version 16.0
-- Dumped by pg_dump version 16.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: unnest_2d_1d(anyarray); Type: FUNCTION; Schema: public; Owner: candles_db
--

CREATE FUNCTION public.unnest_2d_1d(anyarray, OUT a anyarray) RETURNS SETOF anyarray
    LANGUAGE plpgsql IMMUTABLE STRICT
    AS $_$
BEGIN
   FOREACH a SLICE 1 IN ARRAY $1 LOOP
      RETURN NEXT;
   END LOOP;
END
$_$;


ALTER FUNCTION public.unnest_2d_1d(anyarray, OUT a anyarray) OWNER TO candles_db;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: candles; Type: TABLE; Schema: public; Owner: candles_db
--

CREATE TABLE public.candles (
    cid integer NOT NULL,
    made date,
    weight smallint,
    fo_percent smallint,
    container text,
    notes text
);


ALTER TABLE public.candles OWNER TO candles_db;

--
-- Name: candles_id_seq; Type: SEQUENCE; Schema: public; Owner: candles_db
--

CREATE SEQUENCE public.candles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.candles_id_seq OWNER TO candles_db;

--
-- Name: candles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: candles_db
--

ALTER SEQUENCE public.candles_id_seq OWNED BY public.candles.cid;


--
-- Name: fo; Type: TABLE; Schema: public; Owner: candles_db
--

CREATE TABLE public.fo (
    cid integer,
    name text,
    brand text,
    percent smallint
);


ALTER TABLE public.fo OWNER TO candles_db;

--
-- Name: waxes; Type: TABLE; Schema: public; Owner: candles_db
--

CREATE TABLE public.waxes (
    cid integer,
    type text,
    brand text,
    percent smallint
);


ALTER TABLE public.waxes OWNER TO candles_db;

--
-- Name: wicks; Type: TABLE; Schema: public; Owner: candles_db
--

CREATE TABLE public.wicks (
    cid integer,
    type text,
    size text,
    wicknum smallint
);


ALTER TABLE public.wicks OWNER TO candles_db;

--
-- Name: candles cid; Type: DEFAULT; Schema: public; Owner: candles_db
--

ALTER TABLE ONLY public.candles ALTER COLUMN cid SET DEFAULT nextval('public.candles_id_seq'::regclass);


--
-- Data for Name: candles; Type: TABLE DATA; Schema: public; Owner: candles_db
--

COPY public.candles (cid, made, weight, fo_percent, container, notes) FROM stdin;
58	2023-11-15	12	9	\N	\N
59	2023-11-15	12	9	\N	\N
60	2023-11-15	12	9	\N	\N
61	2023-11-26	12	9	\N	\N
\.


--
-- Data for Name: fo; Type: TABLE DATA; Schema: public; Owner: candles_db
--

COPY public.fo (cid, name, brand, percent) FROM stdin;
58	White Cashmere	Simbi	100
59	Guesthouse	Simbi	100
60	Mulled Sugar Plum	Simbi	100
61	Guesthouse	Simbi	100
\.


--
-- Data for Name: waxes; Type: TABLE DATA; Schema: public; Owner: candles_db
--

COPY public.waxes (cid, type, brand, percent) FROM stdin;
58	Coco Apricot	VCS	100
59	Coco Apricot	VCS	100
60	Coco Apricot	VCS	100
61	Coco Apricot	VCS	100
\.


--
-- Data for Name: wicks; Type: TABLE DATA; Schema: public; Owner: candles_db
--

COPY public.wicks (cid, type, size, wicknum) FROM stdin;
58	Aroma Lite	AL-80	2
59	Aroma Lite	AL-80	2
60	Aroma Lite	AL-80	2
61	Premier	Premier-730	2
\.


--
-- Name: candles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: candles_db
--

SELECT pg_catalog.setval('public.candles_id_seq', 61, true);


--
-- Name: candles candles_pkey; Type: CONSTRAINT; Schema: public; Owner: candles_db
--

ALTER TABLE ONLY public.candles
    ADD CONSTRAINT candles_pkey PRIMARY KEY (cid);


--
-- PostgreSQL database dump complete
--

