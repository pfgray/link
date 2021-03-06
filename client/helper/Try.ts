export type Try<A> = Success<A> | Err;

export interface Success<A> {
  type: 'Success';
  value: A;
};

export interface Err {
  type: 'Err';
  error: any;
};

export const Try = {
  of<A>(f: () => A): Try<A> {
    try {
      return Success(f());
    } catch (e) {
      return Err(e);
    }
  },
  map<A, B>(t: Try<A>): (f: (a:A) => B) => Try<B> {
    switch(t.type) {
      case 'Success':
        return f => Success(f(t.value));
      case 'Err':
        return f => t;
    }
  },
  flatMap<A, B>(t: Try<A>): (f: (a:A) => Try<B>) => Try<B> {
    switch(t.type) {
      case 'Success':
        return f => f(t.value);
      case 'Err':
        return f => t;
    }
  }
}

export function Success<A>(a: A): Success<A> {
  return {
    type: 'Success',
    value: a
  };
}

export function Err(error: any): Err {
  return {
    type: 'Err',
    error
  }
}
