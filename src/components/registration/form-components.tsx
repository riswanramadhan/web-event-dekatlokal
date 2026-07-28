"use client";

import {
  Check,
  NavArrowDown,
  NavArrowUp,
  RefreshDouble,
  ShieldCheck,
  WarningCircle,
} from "iconoir-react";
import type {
  ChangeEvent,
  InputHTMLAttributes,
  KeyboardEvent as ReactKeyboardEvent,
  OptionHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { useFormStatus } from "react-dom";

type FormSectionProps = {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function FormSection({
  number,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <fieldset className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-card sm:p-7 lg:p-8">
      <legend className="sr-only">{title}</legend>
      <div className="mb-7 flex items-start gap-4">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 font-mono text-sm font-semibold text-brand">
          {number}
        </span>
        <div>
          <h2 className="text-xl font-semibold tracking-[-0.025em] text-ink">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  helper?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

export function FormField({
  label,
  name,
  helper,
  error,
  required,
  className = "",
  children,
}: FormFieldProps) {
  const helperId = helper ? `${name}-helper` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div className={`min-w-0 ${className}`}>
      <label htmlFor={name} className="block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="ml-1 text-brand" aria-hidden="true">*</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {helper ? (
        <p id={helperId} className="mt-2 text-xs leading-5 text-slate-500">
          {helper}
        </p>
      ) : null}
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-700"
        >
          <WarningCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

const controlClass =
  "min-h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 aria-invalid:border-red-500 aria-invalid:ring-red-100";

export function TextInput({
  name,
  error,
  helper,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
  helper?: string;
}) {
  return (
    <input
      id={name}
      name={name}
      className={controlClass}
      aria-invalid={Boolean(error)}
      aria-describedby={
        [helper ? `${name}-helper` : "", error ? `${name}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
      {...props}
    />
  );
}

type ParsedSelectOption = {
  value: string;
  label: string;
  disabled: boolean;
  selected: boolean;
};

function getNodeText(node: ReactNode): string {
  return Children.toArray(node)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") {
        return String(child);
      }

      if (isValidElement<{ children?: ReactNode }>(child)) {
        return getNodeText(child.props.children);
      }

      return "";
    })
    .join("")
    .trim();
}

function parseSelectOptions(children: ReactNode): ParsedSelectOption[] {
  const parsedOptions: ParsedSelectOption[] = [];

  function visit(node: ReactNode) {
    Children.forEach(node, (child) => {
      if (!isValidElement<OptionHTMLAttributes<HTMLOptionElement>>(child)) {
        return;
      }

      if (child.type === "option") {
        const label = getNodeText(child.props.children);

        parsedOptions.push({
          value: String(child.props.value ?? label),
          label,
          disabled: Boolean(child.props.disabled),
          selected: Boolean(child.props.selected),
        });
        return;
      }

      visit(child.props.children);
    });
  }

  visit(children);
  return parsedOptions;
}

function normalizeSelectValue(
  value: string | readonly string[] | number | undefined,
): string {
  if (Array.isArray(value)) {
    return String(value[0] ?? "");
  }

  return value === undefined ? "" : String(value);
}

export function SelectInput({
  name,
  error,
  helper,
  children,
  id,
  value,
  defaultValue,
  disabled = false,
  required = false,
  autoFocus = false,
  className = "",
  onChange,
  onInvalid,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  error?: string;
  helper?: string;
}) {
  const generatedId = useId();
  const triggerId = id ?? name;
  const nativeSelectId = `${generatedId}-native`;
  const listboxId = `${generatedId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const nativeSelectRef = useRef<HTMLSelectElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);
  const typeaheadValueRef = useRef("");
  const typeaheadTimerRef = useRef<number | undefined>(undefined);
  const options = useMemo(() => parseSelectOptions(children), [children]);
  const controlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(() =>
    normalizeSelectValue(
      defaultValue ??
        options.find((option) => option.selected)?.value ??
        options[0]?.value ??
        "",
    ),
  );
  const selectedValue = controlled
    ? normalizeSelectValue(value)
    : uncontrolledValue;
  const selectedIndex = options.findIndex(
    (option) => option.value === selectedValue,
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [menuPlacement, setMenuPlacement] = useState<"top" | "bottom">("bottom");
  const describedBy =
    [
      props["aria-describedby"],
      helper ? `${name}-helper` : "",
      error ? `${name}-error` : "",
    ]
      .filter(Boolean)
      .join(" ") || undefined;

  const firstEnabledIndex = useCallback(
    () => options.findIndex((option) => !option.disabled),
    [options],
  );

  const lastEnabledIndex = useCallback(() => {
    for (let index = options.length - 1; index >= 0; index -= 1) {
      if (!options[index]?.disabled) {
        return index;
      }
    }

    return -1;
  }, [options]);

  const updateMenuPlacement = useCallback(() => {
    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const estimatedMenuHeight = Math.min(
      options.length * 52 + 20,
      Math.min(288, window.innerHeight * 0.45),
    );
    const mobileNavigationClearance = window.matchMedia(
      "(max-width: 767px)",
    ).matches
      ? 92
      : 16;
    const spaceBelow =
      window.innerHeight - triggerRect.bottom - mobileNavigationClearance;
    const spaceAbove = triggerRect.top;

    setMenuPlacement(
      spaceBelow < estimatedMenuHeight && spaceAbove > spaceBelow
        ? "top"
        : "bottom",
    );
  }, [options.length]);

  const openMenu = useCallback(
    (preference: "selected" | "first" | "last" = "selected") => {
      if (disabled) {
        return;
      }

      let nextActiveIndex = selectedIndex;

      if (
        preference === "first" ||
        nextActiveIndex < 0 ||
        options[nextActiveIndex]?.disabled
      ) {
        nextActiveIndex = firstEnabledIndex();
      }

      if (preference === "last") {
        nextActiveIndex = lastEnabledIndex();
      }

      updateMenuPlacement();
      setActiveIndex(nextActiveIndex);
      setIsOpen(true);
    },
    [
      disabled,
      firstEnabledIndex,
      lastEnabledIndex,
      options,
      selectedIndex,
      updateMenuPlacement,
    ],
  );

  const closeMenu = useCallback((restoreFocus = false) => {
    setIsOpen(false);

    if (restoreFocus) {
      window.requestAnimationFrame(() => triggerRef.current?.focus());
    }
  }, []);

  const commitValue = useCallback(
    (optionIndex: number) => {
      const option = options[optionIndex];

      if (!option || option.disabled) {
        return;
      }

      if (!controlled) {
        setUncontrolledValue(option.value);
      }

      const nativeSelect = nativeSelectRef.current;

      if (nativeSelect) {
        const valueSetter = Object.getOwnPropertyDescriptor(
          HTMLSelectElement.prototype,
          "value",
        )?.set;

        if (valueSetter) {
          valueSetter.call(nativeSelect, option.value);
        } else {
          nativeSelect.value = option.value;
        }

        nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
      }

      closeMenu(true);
    },
    [closeMenu, controlled, options],
  );

  const moveActiveOption = useCallback(
    (direction: 1 | -1) => {
      if (options.length === 0) {
        return;
      }

      let nextIndex =
        activeIndex >= 0
          ? activeIndex
          : direction === 1
            ? firstEnabledIndex() - 1
            : lastEnabledIndex() + 1;

      for (let attempt = 0; attempt < options.length; attempt += 1) {
        nextIndex =
          (nextIndex + direction + options.length) % options.length;

        if (!options[nextIndex]?.disabled) {
          setActiveIndex(nextIndex);
          return;
        }
      }
    },
    [activeIndex, firstEnabledIndex, lastEnabledIndex, options],
  );

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (isOpen) {
          moveActiveOption(1);
        } else {
          openMenu("selected");
        }
        return;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          moveActiveOption(-1);
        } else {
          openMenu("last");
        }
        return;
      case "Home":
        event.preventDefault();
        if (!isOpen) {
          openMenu("first");
        } else {
          setActiveIndex(firstEnabledIndex());
        }
        return;
      case "End":
        event.preventDefault();
        if (!isOpen) {
          openMenu("last");
        } else {
          setActiveIndex(lastEnabledIndex());
        }
        return;
      case "Enter":
      case " ":
        event.preventDefault();
        if (isOpen && activeIndex >= 0) {
          commitValue(activeIndex);
        } else {
          openMenu("selected");
        }
        return;
      case "Escape":
        if (isOpen) {
          event.preventDefault();
          event.stopPropagation();
          closeMenu(true);
        }
        return;
      default:
        break;
    }

    if (
      event.key.length !== 1 ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    const pressedKey = event.key.toLocaleLowerCase("id-ID");
    const bufferedValue = `${typeaheadValueRef.current}${pressedKey}`;
    const repeatedCharacter = [...bufferedValue].every(
      (character) => character === pressedKey,
    );
    const searchValue = repeatedCharacter ? pressedKey : bufferedValue;
    typeaheadValueRef.current = searchValue;

    if (typeaheadTimerRef.current !== undefined) {
      window.clearTimeout(typeaheadTimerRef.current);
    }

    typeaheadTimerRef.current = window.setTimeout(() => {
      typeaheadValueRef.current = "";
      typeaheadTimerRef.current = undefined;
    }, 650);

    const searchStart = activeIndex >= 0 ? activeIndex + 1 : 0;

    for (let offset = 0; offset < options.length; offset += 1) {
      const optionIndex = (searchStart + offset) % options.length;
      const option = options[optionIndex];

      if (
        option &&
        !option.disabled &&
        option.label.toLocaleLowerCase("id-ID").startsWith(searchValue)
      ) {
        if (!isOpen) {
          openMenu("first");
        }
        setActiveIndex(optionIndex);
        return;
      }
    }
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        closeMenu();
      }
    }

    function handleDocumentKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
      }
    }

    function handleViewportChange() {
      updateMenuPlacement();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleDocumentKeyDown);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleDocumentKeyDown);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
    };
  }, [closeMenu, isOpen, updateMenuPlacement]);

  useEffect(() => {
    if (isOpen && activeIndex >= 0) {
      optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    const form = nativeSelectRef.current?.form;

    if (!form || controlled) {
      return;
    }

    function handleReset() {
      setUncontrolledValue(
        normalizeSelectValue(
          defaultValue ??
            options.find((option) => option.selected)?.value ??
            options[0]?.value ??
            "",
        ),
      );
      closeMenu();
    }

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [closeMenu, controlled, defaultValue, options]);

  useEffect(
    () => () => {
      if (typeaheadTimerRef.current !== undefined) {
        window.clearTimeout(typeaheadTimerRef.current);
      }
    },
    [],
  );

  return (
    <div ref={rootRef} className="relative">
      <select
        ref={nativeSelectRef}
        id={nativeSelectId}
        name={name}
        value={selectedValue}
        disabled={disabled}
        required={required}
        tabIndex={-1}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-4 h-px w-px opacity-0"
        onChange={(event) => {
          if (!controlled) {
            setUncontrolledValue(event.currentTarget.value);
          }
          onChange?.(event);
        }}
        onInvalid={(event) => {
          onInvalid?.(event);
          openMenu("first");
          window.requestAnimationFrame(() => triggerRef.current?.focus());
        }}
        {...props}
      >
        {children}
      </select>

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={
          isOpen && activeIndex >= 0
            ? `${listboxId}-option-${activeIndex}`
            : undefined
        }
        aria-required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        aria-label={props["aria-label"]}
        aria-labelledby={props["aria-labelledby"]}
        disabled={disabled}
        autoFocus={autoFocus}
        onClick={() => {
          if (isOpen) {
            closeMenu();
          } else {
            openMenu("selected");
          }
        }}
        onKeyDown={handleTriggerKeyDown}
        className={`${controlClass} flex cursor-pointer items-center justify-between gap-3 pr-3 text-left disabled:cursor-not-allowed ${className}`}
      >
        <span
          className={`min-w-0 flex-1 truncate ${
            selectedOption && selectedOption.value !== ""
              ? "text-ink"
              : "text-slate-400"
          }`}
        >
          {selectedOption?.label || "Pilih opsi"}
        </span>
        <span className="inline-flex shrink-0 text-slate-500" aria-hidden="true">
          {isOpen ? (
            <NavArrowUp className="h-5 w-5" strokeWidth={1.8} />
          ) : (
            <NavArrowDown className="h-5 w-5" strokeWidth={1.8} />
          )}
        </span>
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          className={`absolute left-0 z-[100] max-h-[min(18rem,45vh)] w-full min-w-0 overflow-y-auto overscroll-contain rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_55px_rgba(15,23,42,0.18)] ${
            menuPlacement === "top"
              ? "bottom-[calc(100%+0.5rem)]"
              : "top-[calc(100%+0.5rem)]"
          }`}
        >
          {options.map((option, optionIndex) => {
            const selected = option.value === selectedValue;
            const active = optionIndex === activeIndex;

            return (
              <li
                ref={(node) => {
                  optionRefs.current[optionIndex] = node;
                }}
                key={`${option.value}-${optionIndex}`}
                id={`${listboxId}-option-${optionIndex}`}
                role="option"
                aria-selected={selected}
                aria-disabled={option.disabled || undefined}
                onPointerMove={() => {
                  if (!option.disabled) {
                    setActiveIndex(optionIndex);
                  }
                }}
                onPointerDown={(event) => event.preventDefault()}
                onClick={() => commitValue(optionIndex)}
                className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm outline-none transition ${
                  option.disabled
                    ? "cursor-not-allowed text-slate-400"
                    : "cursor-pointer text-ink"
                } ${
                  active
                    ? "bg-brand-50 text-brand-900"
                    : selected
                      ? "bg-slate-50"
                      : "hover:bg-slate-50"
                }`}
              >
                <span className="min-w-0 flex-1">{option.label}</span>
                {selected ? (
                  <Check
                    className="h-4 w-4 shrink-0 text-brand"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

export function TextArea({
  name,
  error,
  helper,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  error?: string;
  helper?: string;
}) {
  return (
    <textarea
      id={name}
      name={name}
      className={`${controlClass} min-h-32 resize-y`}
      aria-invalid={Boolean(error)}
      aria-describedby={
        [helper ? `${name}-helper` : "", error ? `${name}-error` : ""]
          .filter(Boolean)
          .join(" ") || undefined
      }
      {...props}
    />
  );
}

type MultiSelectOption = {
  value: string;
  label: string;
  description?: string;
};

export function MultiSelectField({
  legend,
  name,
  options,
  helper,
  error,
  required,
}: {
  legend: string;
  name: string;
  options: readonly MultiSelectOption[];
  helper?: string;
  error?: string;
  required?: boolean;
}) {
  const helperId = helper ? `${name}-helper` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const [selectedValues, setSelectedValues] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.currentTarget.value;
    const checked = event.currentTarget.checked;

    setSelectedValues((current) => {
      const next = new Set(current);

      if (checked) {
        next.add(value);
      } else {
        next.delete(value);
      }

      return next;
    });
  }

  return (
    <fieldset
      className="sm:col-span-2"
      aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
      aria-invalid={Boolean(error)}
    >
      <legend className="text-sm font-semibold text-ink">
        {legend}
        {required ? <span className="ml-1 text-brand" aria-hidden="true">*</span> : null}
      </legend>
      {helper ? (
        <p id={helperId} className="mt-1 text-xs leading-5 text-slate-500">
          {helper}
        </p>
      ) : null}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="group relative flex min-h-16 cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-brand-200 hover:bg-brand-50/50 focus-within:border-brand focus-within:ring-4 focus-within:ring-brand-100 has-[:checked]:border-brand has-[:checked]:bg-brand-50"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              required={
                Boolean(required) &&
                selectedValues.size === 0 &&
                option.value === options[0]?.value
              }
              onChange={handleChange}
              className="peer sr-only"
            />
            <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border border-slate-300 bg-white text-transparent peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white">
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink">{option.label}</span>
              {option.description ? (
                <span className="mt-1 block text-xs leading-5 text-slate-500">
                  {option.description}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-xs font-medium leading-5 text-red-700"
        >
          <WarningCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

export function ConsentField({
  name,
  label,
  description,
  error,
  required,
}: {
  name: string;
  label: ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
}) {
  const descriptionId = description ? `${name}-description` : undefined;
  const errorId = error ? `${name}-error` : undefined;

  return (
    <div>
      <label className="group flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition focus-within:ring-4 focus-within:ring-brand-100 has-[:checked]:border-brand-200 has-[:checked]:bg-brand-50/70">
        <input
          type="checkbox"
          id={name}
          name={name}
          value="true"
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={
            [descriptionId, errorId].filter(Boolean).join(" ") || undefined
          }
          className="mt-1 h-4 w-4 shrink-0 accent-brand"
        />
        <span>
          <span className="block text-sm font-medium leading-6 text-ink">{label}</span>
          {description ? (
            <span
              id={descriptionId}
              className="mt-1 block text-xs leading-5 text-slate-500"
            >
              {description}
            </span>
          ) : null}
        </span>
      </label>
      {error ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2 text-xs font-medium text-red-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function FormNotice({
  tone = "info",
  children,
}: {
  tone?: "info" | "warning" | "error" | "success";
  children: ReactNode;
}) {
  const tones = {
    info: "border-brand-200 bg-brand-50 text-brand-900",
    warning: "border-amber-200 bg-amber-50 text-amber-900",
    error: "border-red-200 bg-red-50 text-red-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  };

  return (
    <div
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-2xl border px-4 py-3 text-sm leading-6 ${tones[tone]}`}
    >
      {children}
    </div>
  );
}

export function SubmitButton({
  label,
  pendingLabel = "Mengirim pendaftaran…",
  disabled = false,
}: {
  label: string;
  pendingLabel?: string;
  disabled?: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={disabled || pending}
      aria-disabled={disabled || pending}
      className="button-loop inline-flex min-h-13 w-fit max-w-full self-center items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-center text-sm font-semibold text-white shadow-[0_14px_32px_rgba(2,85,245,0.22)] transition hover:-translate-y-0.5 hover:bg-brand-600 disabled:cursor-not-allowed disabled:translate-y-0 disabled:bg-slate-400 disabled:shadow-none sm:self-auto sm:px-6"
    >
      {pending ? (
        <RefreshDouble
          className="h-4.5 w-4.5 animate-spin"
          aria-hidden="true"
        />
      ) : (
        <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}
