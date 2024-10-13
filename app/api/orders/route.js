
import { supabase } from '@/app/supabaseAuth';
import { NextResponse } from 'next/server';

// Handle GET requests (fetch all orders or filter by email)
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  try {
    let query = supabase.from('order').select('*'); // Start with a basic query

    if (email) {
      query = query.eq('email', email);
    }
    const { data, error } = await query;
    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ orders: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

// Handle POST requests (insert new orders)
export async function POST(request) {
  try {
    const body = await request.json(); 
    const { productName, priceGroup, quantity, email } = body; // Get data from the request body

    // Insert the order data into the database using Supabase
    const { data, error } = await supabase
      .from('order')
      .insert([{ productName, priceGroup, quantity, email }]);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'Order inserted successfully', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

//order data delete method by using ID.
export async function DELETE(request) {
  try {
    const { id } = await request.json(); 
    const { data, error } = await supabase
      .from('order')
      .delete()
      .eq('id', id); // order ID match

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'Order deleted successfully', data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, quantity} = body;

    const {data, error} = await supabase
    .from('order')
    .update({quantity})
    .eq('id', id)

    if(error){
      return NextResponse.json({message: error.message}, {status: 400})
    }
    return NextResponse.json({message: 'Order quantity updated successfully', data}, {status: 200})
  } catch (error) {
    return NextResponse.json({message: 'Server error', error: error.message}, {status: 500})
  }
}