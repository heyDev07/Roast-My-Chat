-- Roast My Chat Database Schema

-- Profiles table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  reports_count INTEGER DEFAULT 0,
  is_premium BOOLEAN DEFAULT false,
  premium_since TIMESTAMPTZ,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports table
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  platform TEXT,
  chat_partner TEXT,
  result JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_reports_user_id ON reports(user_id);
CREATE INDEX idx_reports_created_at ON reports(created_at DESC);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- Function to increment report count
CREATE OR REPLACE FUNCTION increment_report_count(user_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE profiles
  SET reports_count = reports_count + 1
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to check if user can analyze
CREATE OR REPLACE FUNCTION can_analyze(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  user_profile profiles%ROWTYPE;
BEGIN
  SELECT * INTO user_profile FROM profiles WHERE id = user_id;
  
  -- Premium users have unlimited access
  IF user_profile.is_premium THEN
    RETURN true;
  END IF;
  
  -- Free users get 100 reports
  RETURN user_profile.reports_count < 100;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Reports policies
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports"
  ON reports FOR DELETE
  USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscription"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);
